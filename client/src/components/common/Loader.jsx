import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import '../../assets/styles/common/Loader.css'

const Loader = ({ message }) => {
  return (
    <Box className="loader">
      <p> { message } </p>
      <CircularProgress />
    </Box>
  )
}

export default Loader