import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';


const GlassBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(155, 155, 155, 0.2)', // Semi-transparent white background
    height: '100px',
    margin: '0px',
    borderRadius: '20px 20px 0 0', // Rounded corners
    // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Subtle shadow
    backdropFilter: 'blur(10px)', // Blur effect
    border: '1px solid rgba(255, 255, 255, 0.3)', // Border with some transparency
    position: 'relative', // Position relative for absolute positioning of zigzag lines
}));


const Clock = () => {
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        const timerId = setInterval(() => {
            setDate(new Date());
        }, 1000);


        return () => clearInterval(timerId);
    }, []);


    const timeFormatter = new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });


    const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (
        <GlassBox>
            <Typography color={"neutral.900"} fontSize={"36px"} fontWeight={"900"}>{timeFormatter.format(date)}</Typography>
            <Typography color={"neutral.800"} fontFamily={"sans-serif"}>{dateFormatter.format(date)}</Typography>
        </GlassBox>
    );
};


export default Clock;