import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Link, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../../app/types';
import { IJwtState } from '../../jwt/reducer';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const jwtState = useSelector<IReduxState, IJwtState>((state) => state['features/base/jwt']);

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      // auth.signOut();
    },
    [onClose]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {jwtState?.user?.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem>
          <Link href="/logout" underline='none' color={'#000'}>
            Đăng xuất
          </Link>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
