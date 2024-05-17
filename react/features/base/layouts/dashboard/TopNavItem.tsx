import React from 'react';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Stack } from '@mui/material';
import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const TOP_NAV_HEIGHT = 64;

type Props = {
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  icon: any;
  path: string;
  title: string;
  className?: string;
}

const StyledButtonBase = styled(ButtonBase)<{ active?: boolean }>(({ theme, active }) => ({
    position: 'relative',
    alignItems: 'center',
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0 `,
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '16px',
    paddingRight: '16px',
    textAlign: 'left',
    width: '100%',
    paddingTop: '3px',
    height: `${TOP_NAV_HEIGHT}px`,
    ...(active && {
      backgroundColor:  theme.palette.background.default,
    }),
    ...(!active && { '&:hover': {
      backgroundColor: 'rgba(40, 40, 40, 0.04)',
    }, })

  }));

export const TopNavItem = (props: Props) => {
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
      <StyledButtonBase
        active={active}
        {...linkProps}
      >
        <Stack
        display={"flex"}
        direction={"column"}
        alignItems={"center"}
        justifyItems={"center"}
        >

        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.500',
              display: 'inline-flex',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          display={{ xs: 'none', md: 'block' }}
          sx={{
            color: 'neutral.900',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 12,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'success.light'
            }),
            ...(disabled && {
              color: 'neutral.700'
            })
          }}
        >
          {title}
        </Box>
        </Stack>
      </StyledButtonBase>
    </li>
  );
};

TopNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
