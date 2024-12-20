import React from 'react';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  icon: any;
  path: string;
  title: string;
  className?: string;
}

export const SideNavItem = (props: Props) => {
  const { active = false, disabled, external, icon, path, title, className } = props;

  const linkProps = path
    ? external
      ? {
        component: 'a',
        to: path,
        target: '_blank'
      }
      : {
        component: Link,
        to: path
        // href: path
      }
    : {};

  return (
    <li className={className}>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '12px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: '#fff',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'success.light'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: '#fff',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'success.light'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
