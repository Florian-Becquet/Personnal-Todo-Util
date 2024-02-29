import React from 'react'
import '../../assets/styles/common/Header.css'

// Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Header = () => {
  return (
    <header>
        <div className='header__home'>
            <HomeOutlinedIcon />
        </div>
        <div className='header__notifications'>
            <NotificationsNoneOutlinedIcon />
        </div>
    </header>
  )
}

export default Header