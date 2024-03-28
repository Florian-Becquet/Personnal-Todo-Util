import React, { useState } from 'react'
import '../../assets/styles/common/Header.css'

// Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TodoForm from '../../pages/dashboard/TodoForm';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// import MenuIcon from '@mui/icons-material/Menu';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Sidebar from './Sidebar';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const active = showMobileMenu ? 'active' : '';
  return (
    <header>
      <TodoForm showNav={showNav} setShowNav={setShowNav} />
      <Sidebar showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />
      <div className='header__home'>
        {showMobileMenu ?
          <CloseOutlinedIcon className={`hide__lg ${active}`} onClick={() => setShowMobileMenu(!showMobileMenu)} />
          :
          <MenuOutlinedIcon className={`hide__lg ${active}`} onClick={() => setShowMobileMenu(!showMobileMenu)} />
        }

        <Link to="/"><HomeOutlinedIcon /></Link>
      </div>
      <div className='header__notifications'>
        <AddOutlinedIcon onClick={() => setShowNav(!showNav)} />
        <NotificationsNoneOutlinedIcon className='opacityLow' />
        <SettingsOutlinedIcon className='opacityLow' />
      </div>
    </header>
  )
}

export default Header