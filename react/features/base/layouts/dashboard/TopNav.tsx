import React from 'react';
import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import VideoCameraIcon from '@heroicons/react/24/outline/VideoCameraIcon';
import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import RssIcon from '@heroicons/react/24/outline/RssIcon';


import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  Link
} from '@mui/material';

import { alpha } from '@mui/material/styles';
import { usePopover } from './hook';
import { AccountPopover } from './AccountPopOver';
import { TopNavItem } from "./TopNavItem"

const SIDE_NAV_WIDTH = 0;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: "#d9d9d963",
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar

        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Link href="/">
            <img
                alt='powered-by'
                src='images/powered-by.svg'
                width={120}
              />
            </Link>
            {/* {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )} */}
            {/* <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
          </Stack>
          <Stack
            component="ul"
            alignItems="center"
            direction="row"
            spacing={0}
            height="100%"
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            <TopNavItem

              active={location.pathname === '/'}
              icon={<HomeIcon  width={24} height={24}/>}
              path="/"
              title="Dashboard"
            />
            <TopNavItem

              active={location.pathname === '/new-meeting'}
              icon={<VideoCameraIcon width={24} height={24}/>}
              path="/new-meeting"
              title="Cuộc họp"
            />
            <TopNavItem

              active={location.pathname === '/meeting-history'}
              icon={<BookmarkIcon width={24} height={24} />}
              path="/meeting-history"
              title="Lịch sử"
            />
            <TopNavItem

              active={location.pathname === '/account'}
              icon={<UserGroupIcon width={24} height={24}/>}
              path="/account"
              title="Hồ sơ"
            />
            <TopNavItem

              active={location.pathname === '/support'}
              icon={<RssIcon width={24} height={24} />}
              path="/support"
              title="Hỗ trợ"
            />
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {/* <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
