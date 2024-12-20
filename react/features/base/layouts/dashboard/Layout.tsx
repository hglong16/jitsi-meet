import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { WithAuthGuard } from './WithAuthGuard';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

const SIDE_NAV_WIDTH = 0;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  paddingTop: '5px',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = ((props) => {
  const { children } = props;
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  );

  return (
    <>
      <Box sx={{
        backgroundColor: '#fff'
      }}>
        <TopNav onNavOpen={() => setOpenNav(true)} />
        {/* <SideNav
          onClose={() => setOpenNav(false)}
          open={openNav}
        /> */}
        <LayoutRoot>
          <LayoutContainer>
            {children}
          </LayoutContainer>
        </LayoutRoot>
      </Box>
    </>
  );
});
