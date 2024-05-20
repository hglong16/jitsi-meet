import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../../layouts/dashboard/Layout';
import { Box, Grid, Stack, Typography } from '@mui/material';
import MeetingsList, { IMeeting } from '../../react/components/web/MeetingsList';
import { useDispatch } from 'react-redux';
import { appNavigate } from '../../../app/actions.web';
import { OngoingConference, getOngoingConferences, toDisplayConference } from '../function.any';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import VideoCameraIcon from '@heroicons/react/24/outline/VideoCameraIcon';
import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import RssIcon from '@heroicons/react/24/outline/RssIcon';
import { DashboardItem } from './DashboardItem';
import Clock from './GlassClock';

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
            if (ref.current) {
                clearInterval(ref.current)
            }
        }
    }, []);

    return (
        <Layout>
            <div className='dashboard-container ml-8 w-full '>
                <Box className='mb-2 mt-2 w-full'  >
                    <Stack
                        marginX={"auto"}
                        display={"flex"}
                        gap="45px"
                        maxWidth={"800px"}
                        minHeight={"400px"}
                        direction={{
                            xs: 'column',
                            sm: 'row',
                        }}
                        paddingTop={"40px"}
                        width={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        overflow={"hidden"}
                    >
                        <Stack
                            width={"260px"}
                            display={"flex"}
                            direction={"row"}
                            justifyContent={"space-between"}
                            gap={"60px"}
                            flexWrap={"wrap"}
                        >
                            <DashboardItem
                                active={location.pathname === '/new-meeting'}
                                backgroundColor='#ff742e'
                                icon={<VideoCameraIcon width={24} height={24} />}
                                path="/new-meeting"
                                title="Cuộc họp"
                            />
                            <DashboardItem
                                backgroundColor='#0e71eb'
                                active={location.pathname === '/meeting-history'}
                                icon={<BookmarkIcon width={24} height={24} />}
                                path="/meeting-history"
                                title="Lịch sử"
                            />
                            <DashboardItem
                                backgroundColor='#0e71eb'
                                active={location.pathname === '/account'}
                                icon={<UserGroupIcon width={24} height={24} />}
                                path="/account"
                                title="Hồ sơ"
                            />

                            <DashboardItem
                                backgroundColor='#0e71eb'
                                active={location.pathname === '/support'}
                                icon={<RssIcon width={24} height={24} />}
                                path="/support"
                                title="Hỗ trợ"
                            />
                        </Stack>

                        <Stack className=''
                            width={"400px"} borderRadius={"20px"} border="0.5px solid rgba(50,50,50,0.1)">
                            <Clock />
                            <Stack padding={"15px"} minHeight={"300px"}>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: '#000',
                                        paddingBottom: '12px',
                                        paddingTop: '12px',
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
                                                disabled={false}
                                                listEmptyComponent={() => { }}
                                            />
                                        </div>
                                    ) : (
                                        <Typography
                                            variant="body1"
                                            fontSize={"16px"}
                                            lineHeight={"1.2"}
                                            sx={{
                                                color: '#000',
                                            }}
                                        >
                                            Không có cuộc họp nào đang diễn ra cả. Nếu bạn muốn tạo phòng họp, vui lòng "Tạo cuộc họp mới"
                                        </Typography>
                                    )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </div>
        </Layout>
    );
};

export default Dashboard;