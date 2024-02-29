import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingIndicator() {
  return (
    <Box sx={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', display: 'flex', background: '#000', opacity: 0.75, zIndex: 10 }}>
      <CircularProgress size={60} />
    </Box>
  );
}