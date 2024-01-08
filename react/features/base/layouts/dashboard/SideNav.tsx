import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Scrollbar } from './ScrollBar';
import { items } from './config';
import { SideNavItem } from './SideNavItem';
import { Link, useLocation } from 'react-router-dom';

import DashboardIcon from '../../../../../images/skymeet/dashboard.svg';
import StartMeetingIcon from '../../../../../images/skymeet/startMeeting.svg';
import MeetingHistoryIcon from '../../../../../images/skymeet/history.svg';
import UserSettingIcon from '../../../../../images/skymeet/userSetting.svg';
import SupportIcon from '../../../../../images/skymeet/support.svg';
import LogoutIcon from '../../../../../images/skymeet/logout.svg';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const location = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Box
      sx={{
        height: '100%',
      }}
      className="abc"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            LOGO
            {/* <Logo /> */}
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                Devias
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                Production
              </Typography>
            </div>
            {/* <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon> */}
          </Box>
        </Box>
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
          className='d-flex flex-column justify-between'
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            <SideNavItem
              className="mb-2"
              active={location.pathname === '/dashboard'}
              icon={<SvgIcon component={DashboardIcon} inheritViewBox sx={{ fill: 'unset' }} />}
              path="/"
              title="Dashboard"
            />
            <SideNavItem
              className="mb-2"
              active={location.pathname === '/new-meeting'}
              icon={<SvgIcon component={StartMeetingIcon} inheritViewBox sx={{ fill: 'unset' }} />}
              path="/new-meeting"
              title="Tạo cuộc họp mới"
            />
            <SideNavItem
              className="mb-2"
              active={location.pathname === '/new-meeting'}
              icon={<SvgIcon component={MeetingHistoryIcon} inheritViewBox sx={{ fill: 'unset' }} />}
              path="/meeting-history"
              title="Lịch sử cuộc họp"
            />
            <SideNavItem
              className="mb-2"
              active={location.pathname === '/account'}
              icon={<SvgIcon component={UserSettingIcon} inheritViewBox sx={{ fill: 'unset' }} />}
              path="/account"
              title="Hồ sơ cá nhân"
            />
            <SideNavItem
              className="mb-2"
              active={location.pathname === '/support'}
              icon={<SvgIcon component={SupportIcon} inheritViewBox sx={{ fill: 'unset' }} />}
              path="/support"
              title="Hỗ trợ"
            />
          </Stack>
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            <SideNavItem
              active={location.pathname === '/logout'}
              icon={<SvgIcon component={LogoutIcon} inheritViewBox sx={{ fill: 'unset' }} />}
              path="/logout"
              title="Đăng xuất"
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
