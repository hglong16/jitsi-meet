import resemble from 'resemblejs';
import 'image-capture';
import './createImageBitmap';

import { createScreensharingCaptureTakenEvent } from '../analytics/AnalyticsEvents';
import { sendAnalytics } from '../analytics/functions';
import { IReduxState } from '../app/types';
import { getCurrentConference } from '../base/conference/functions';
import { getLocalParticipant, getRemoteParticipants } from '../base/participants/functions';
import { ITrack } from '../base/tracks/types';
import { extractFqnFromPath } from '../dynamic-branding/functions.any';

import {
    CLEAR_INTERVAL,
    INTERVAL_TIMEOUT,
    PERCENTAGE_LOWER_BOUND,
    POLL_INTERVAL,
    SET_INTERVAL
} from './constants';
// eslint-disable-next-line lines-around-comment
// @ts-ignore
import { processScreenshot } from './processScreenshot';
import { timerWorkerScript } from './worker';

declare let ImageCapture: any;

/**
 * Effect that wraps {@code MediaStream} adding periodic screenshot captures.
 * Manipulates the original desktop stream and performs custom processing operations, if implemented.
 */
export default class ScreenshotCaptureSummary {
    _state: IReduxState;
    _currentCanvas: HTMLCanvasElement;
    _currentCanvasContext: CanvasRenderingContext2D | null;
    _initializedRegion: boolean;
    _imageCapture: any;
    _streamWorker: Worker;
    _streamHeight: any;
    _streamWidth: any;
    _storedImageData?: ImageData;

    /**
     * Initializes a new {@code ScreenshotCaptureEffect} instance.
     *
     * @param {Object} state - The redux state.
     */
    constructor(state: IReduxState) {
        this._state = state;
        this._currentCanvas = document.createElement('canvas');
        this._currentCanvasContext = this._currentCanvas.getContext('2d');

        // Bind handlers such that they access the same instance.
        this._handleWorkerAction = this._handleWorkerAction.bind(this);
        this._initScreenshotCapture = this._initScreenshotCapture.bind(this);
        this._streamWorker = new Worker(timerWorkerScript, { name: 'Screenshot capture worker' });
        this._streamWorker.onmessage = this._handleWorkerAction;

        this._initializedRegion = false;
    }

    /**
     * Make a call to backend for region selection.
     *
     * @returns {void}
     */
    async _initRegionSelection() {
        const { _screenshotHistoryRegionUrl } = this._state['features/base/config'];
        const conference = getCurrentConference(this._state);
        const sessionId = conference?.getMeetingUniqueId();
        const { jwt } = this._state['features/base/jwt'];

        if (!_screenshotHistoryRegionUrl) {
            return;
        }

        const headers = {
            ...jwt && { 'Authorization': `Bearer ${jwt}` }
        };

        await fetch(`${_screenshotHistoryRegionUrl}/${sessionId}`, {
            method: 'POST',
            headers
        });

        this._initializedRegion = true;
    }

    /**
     * Starts the screenshot capture event on a loop.
     *
     * @param {Track} track - The track that contains the stream from which screenshots are to be sent.
     * @returns {Promise} - Promise that resolves once effect has started or rejects if the
     * videoType parameter is not desktop.
     */
    async start(track: ITrack) {
        const { videoType } = track;
        const stream = track.getOriginalStream();

        if (videoType !== 'desktop') {
            return;
        }
        const desktopTrack = stream.getVideoTracks()[0];
        const { height, width }
            = desktopTrack.getSettings() ?? desktopTrack.getConstraints();

        this._streamHeight = height;
        this._streamWidth = width;
        this._currentCanvas.height = parseInt(height, 10);
        this._currentCanvas.width = parseInt(width, 10);
        this._imageCapture = new ImageCapture(desktopTrack);

        if (!this._initializedRegion) {
            await this._initRegionSelection();
        }
        this._initScreenshotCapture();
    }

    /**
     * Stops the ongoing {@code ScreenshotCaptureEffect} by clearing the {@code Worker} interval.
     *
     * @returns {void}
     */
    stop() {
        this._streamWorker.postMessage({ id: CLEAR_INTERVAL });
    }

    /**
     * Method that is called as soon as the first frame of the video loads from stream.
     * The method is used to store the {@code ImageData} object from the first frames
     * in order to use it for future comparisons based on which we can process only certain
     * screenshots.
     *
     * @private
     * @returns {void}
     */
    async _initScreenshotCapture() {
        const imageBitmap = await this._imageCapture.grabFrame();

        this._currentCanvasContext?.drawImage(imageBitmap, 0, 0, this._streamWidth, this._streamHeight);
        const imageData = this._currentCanvasContext?.getImageData(0, 0, this._streamWidth, this._streamHeight);

        this._storedImageData = imageData;
        this._streamWorker.postMessage({
            id: SET_INTERVAL,
            timeMs: POLL_INTERVAL
        });
    }

    /**
     * Handler of the {@code EventHandler} message that calls the appropriate method based on the parameter's id.
     *
     * @private
     * @param {EventHandler} message - Message received from the Worker.
     * @returns {void}
     */
    _handleWorkerAction(message: { data: { id: number; }; }) {
        return message.data.id === INTERVAL_TIMEOUT && this._handleScreenshot();
    }

    /**
     * Method that processes the screenshot.
     *
     * @private
     * @param {ImageData} imageData - The image data of the new screenshot.
     * @returns {void}
     */
    _doProcessScreenshot(imageData?: ImageData) {
        sendAnalytics(createScreensharingCaptureTakenEvent());

        const conference = getCurrentConference(this._state);
        const sessionId = conference?.getMeetingUniqueId();
        const { connection } = this._state['features/base/connection'];
        const jid = connection?.getJid();
        const timestamp = Date.now();
        const { jwt } = this._state['features/base/jwt'];
        const meetingFqn = extractFqnFromPath();
        const remoteParticipants = getRemoteParticipants(this._state);
        const participants: any = [];

        participants.push(getLocalParticipant(this._state)?.id);
        remoteParticipants.forEach(p => participants.push(p.id));
        this._storedImageData = imageData;

        processScreenshot(this._currentCanvas, {
            jid,
            jwt,
            sessionId,
            timestamp,
            meetingFqn,
            participants
        });
    }

    /**
     * Screenshot handler.
     *
     * @private
     * @returns {void}
     */
    async _handleScreenshot() {
        const imageBitmap = await this._imageCapture.grabFrame();

        this._currentCanvasContext?.drawImage(imageBitmap, 0, 0, this._streamWidth, this._streamHeight);
        const imageData = this._currentCanvasContext?.getImageData(0, 0, this._streamWidth, this._streamHeight);

        resemble(imageData ?? '')
            .compareTo(this._storedImageData ?? '')
            .setReturnEarlyThreshold(PERCENTAGE_LOWER_BOUND)
            .onComplete(resultData => {
                if (resultData.rawMisMatchPercentage > PERCENTAGE_LOWER_BOUND) {
                    this._doProcessScreenshot(imageData);
                }
            });
    }
}
