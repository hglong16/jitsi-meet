import SvgIcon from "@mui/material/SvgIcon";

import DashboardIcon from '../../../../../images/skymeet/dashboard.svg';
import StartMeetingIcon from '../../../../../images/skymeet/startMeeting.svg';
import MeetingHistoryIcon from '../../../../../images/skymeet/history.svg';
import UserSettingIcon from '../../../../../images/skymeet/userSetting.svg';
import SupportIcon from '../../../../../images/skymeet/support.svg';

interface NavItem {
    title: string;
    path: string;
    icon: any;
    disabled?: boolean;
    external?: boolean;
}

export const items: NavItem[] = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: (
            <SvgIcon component={DashboardIcon} inheritViewBox  />
        ),
    },
    {
        title: "Tạo cuộc họp mới",
        path: "/new-meeting",
        icon: (
            <SvgIcon component={StartMeetingIcon} inheritViewBox />
        ),
    },
    {
        title: "Lịch sử cuộc họp",
        path: "/meeting-history",
        icon: (
            <SvgIcon component={MeetingHistoryIcon} inheritViewBox />
        ),
    },
    {
        title: "Hồ sơ cá nhân",
        path: "/account",
        icon: (
            <SvgIcon component={UserSettingIcon} inheritViewBox />
        ),
    },
    {
        title: "Hỗ trợ",
        path: "/support",
        icon: (
            <SvgIcon component={SupportIcon} inheritViewBox />
        ),
    }
];
