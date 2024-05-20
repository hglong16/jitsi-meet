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
    backgroundColor: string;
    path: string;
    title: string;
    className?: string;
}

const StyledButtonBase = styled(ButtonBase)<{ active?: boolean, backgroundColor }>(({ theme, active, backgroundColor }) => ({
    position: 'relative',
    alignItems: 'center',
    borderRadius: `22%`,
    display: 'flex',
    backgroundColor: backgroundColor,
    justifyContent: 'center',
    paddingLeft: '16px',
    paddingRight: '16px',
    textAlign: 'left',
    width: '100px',
    height: '100px',
    paddingTop: '3px',
    transition: 'ease-in-out 0.2s',

    ...(active && {
        backgroundColor: theme.palette.background.default,
    }),
    ...(!active && {
        '&:hover': {
            boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.5)',
            transform: 'translateY(-10px)',
            opacity: 0.95,
        },
    })

}));

export const DashboardItem = (props: Props) => {
    const { active = false, disabled, external, icon, path, title, backgroundColor, className } = props;

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
        <StyledButtonBase
            backgroundColor={backgroundColor}
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
                            color: 'neutral.100',
                            display: 'inline-flex',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: 'neutral.100',
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
    );
};

DashboardItem.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    external: PropTypes.bool,
    icon: PropTypes.node,
    path: PropTypes.string,
    title: PropTypes.string.isRequired
};
