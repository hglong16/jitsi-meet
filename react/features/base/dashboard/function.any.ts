import moment from 'moment';
import { IMeeting } from '../react/components/web/MeetingsList';

export type OngoingConference = {
    id:        string;
    event:     string;
    roomName:  string;
    roomJid:   string;
    createdAt: Date;
    updatedAt: Date;
    end: boolean;
    endTime?:  Date;
}

/**
 * Get ongoing conferences
 *
 * @param {string} url - The skymeet API endpoint URL.
 * @returns {Promise} OngoingConference[]
 */
export async function getOngoingConferences(url: string): Promise<OngoingConference[] | undefined> {
    const headers = {
        "Content-Type": "application/json",
    };

    try {
        const res = await fetch(url, {
            method: "GET",
            headers,
        });

        if (!res.ok) {
            console.log("Status error:", res.status);
        }

        return res.json();
    } catch (err) {
        console.log("Could not send request", err);
    }
}

export function toDisplayConference(conference: OngoingConference): IMeeting {
    const duration = moment().diff(moment(conference.createdAt), 'minutes');
    return {
        date: conference.createdAt,
        time: [conference.createdAt],
        title: conference.roomName,
        url: `/${conference.roomName}`,
    }
}
