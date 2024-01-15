import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import { Layout } from '../../layouts/dashboard/Layout';
import { useDispatch, useSelector } from 'react-redux';
import RecentList from '../../../recent-list/components/RecentList.web';
import { IReduxState } from '../../../app/types';
import { IRecentListState } from '../../../recent-list/reducer';
import MeetingsList from '../../react/components/web/MeetingsList';
import { toDisplayableList } from '../../../recent-list/functions.web';
import { Typography } from '@mui/material';
import { sendAnalytics } from '../../../analytics/functions';
import { createRecentClickedEvent } from '../../../analytics/AnalyticsEvents';
import { appNavigate } from '../../../app/actions.web';
import { getLocalizedDateFormatter } from '../../i18n/dateUtil';
import { deleteRecentListEntry } from '../../../recent-list/actions';

const MONTH_YEAR_FORMAT = 'MM-YYYY';

const MeetingHistory = () => {
  const recentListState = useSelector<IReduxState, IRecentListState>((state) => state['features/recent-list']);
  const dispatch = useDispatch();
  const recentConferenceDict = toRecentConferenceDict(recentListState);
  console.log('recentConferenceDict', recentConferenceDict);

  const onPress = (url: string) => {

    sendAnalytics(createRecentClickedEvent('meeting.tile'));

    dispatch(appNavigate(url));
  };

  const onItemDelete = (entry: Object) => {
    dispatch(deleteRecentListEntry(entry));
  }

  return (
    <Layout>
      <div
        className='meeting-history-container ml-8'
      >
        <div className='mb-2'>
          <Typography
            variant="h2"
          >
            Lịch sử cuộc họp
          </Typography>
          <div className='recent-list-container mt-4'>
            <div
              className='recent-list-wrapper'
              // style={{
              //   padding: '12px',
              //   border: '1px solid #dbdbdb',
              //   'borderRadius': '8px',
              // }}
            >
              {
                Object.keys(recentConferenceDict).map((key) => (
                  <div key={key}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#000',
                        paddingBottom: '32px',
                        paddingTop: '32px',
                      }}
                    >
                      Tháng {getLocalizedDateFormatter(moment(key, MONTH_YEAR_FORMAT).toDate()).format('MM, YYYY')}
                    </Typography>
                    <MeetingsList
                      hideURL={true}
                      meetings={recentConferenceDict[key] as any}
                      onItemDelete={onItemDelete}
                      onPress={onPress}
                    />
                  </div>
                ))
              }
              {/* <RecentList /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const toRecentConferenceDict = (recentListState: IRecentListState) => {
  const recentList: IRecentListState = [];
  for (const recent of recentListState) {
    const date = moment(recent.date).format('YYYY-MM-DD').toString();
    recentList.push({
      ...recent,
      date: date as any
    });
  }
  return _.groupBy(toDisplayableList(recentList as any), ({date})=> moment(date).format(MONTH_YEAR_FORMAT));
};

export default MeetingHistory;