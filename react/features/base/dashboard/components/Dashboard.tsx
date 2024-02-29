import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../../layouts/dashboard/Layout';
import { Grid, Typography } from '@mui/material';
import MeetingsList, { IMeeting } from '../../react/components/web/MeetingsList';
import { useDispatch } from 'react-redux';
import { appNavigate } from '../../../app/actions.web';
import { OngoingConference, getOngoingConferences, toDisplayConference } from '../function.any';

// const URL = process.env.NODE_ENV === 'development'
//   ? 'https://55e3-2405-4803-a0ff-51e0-cd97-c218-a88c-a32c.ngrok-free.app/api/conference'
//   : 'https://api.skymeet.vn/api/conference';
const URL = 'https://api.skymeet.vn/api/conference';

const Dashboard = () => {
  const dispatch = useDispatch();
  const ref = useRef<any>();
  const [conferences, setConfereces] = useState<IMeeting[]>([]);

  const onPress = (url: string) => {
    dispatch(appNavigate(url));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const _conferences = await getOngoingConferences(URL);
        if (_conferences) {
          const meetings = _conferences.map((conference) => {
            return toDisplayConference(conference);
          });
          setConfereces(meetings);
        }
      } catch (err) {
        console.log(err);
      }
    }
    // Run every 10s
    ref.current = setInterval(fetchData, 10 * 1000);
    fetchData();
    return () => {
      if (ref.current){
        clearInterval(ref.current)
      }
    }
  }, []);

  return (
    <Layout>
      <div className='dashboard-container ml-8'>
        <div className='mb-2'>
          <Typography
            variant="h3"
          >
            Dashboard
          </Typography>
          <div className='ongoing-conference-container mt-4'>
            <Grid container spacing={8}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#000',
                    paddingBottom: '32px',
                    paddingTop: '32px',
                  }}
                >
                  Cuộc họp đang diễn ra
                </Typography>
                {conferences.length > 0 ?
                (
                  <div className='recent-list-wrapper'>
                    <MeetingsList
                      hideURL={true}
                      meetings={conferences}
                      onPress={onPress}
                      disabled = {false}
                      listEmptyComponent={() => {}}
                    />
                  </div>
                ) : (
                  <Typography
                  variant="body1"
                  sx={{
                    color: '#000',
                  }}
                >
                  Không có cuộc họp nào đang diễn ra cả. Nếu bạn muốn tạo phòng họp, vui lòng "Tạo cuộc họp mới"
                </Typography>
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;