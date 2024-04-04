import React, { useState } from 'react'
import '../../assets/styles/common/Header.css'

// Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TodoForm from '../../pages/dashboard/TodoForm';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Sidebar from './Sidebar';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useGlobalState } from '../../redux/store';

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const loading = useGlobalState('loading')


  const active = showMobileMenu ? 'active' : '';
  const disable = loading[0] || active ? 'disable' : '';


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
        {active ?
          <Link className={disable}><HomeOutlinedIcon /></Link>
          :
          <Link className={disable} to="/"><HomeOutlinedIcon  /></Link>
        }
      </div>
      <div className='header__notifications'>
        <button disabled={loading[0] || active ? true : false} onClick={() => setShowNav(!showNav)}><AddOutlinedIcon className={disable}/></button>
        <NotificationsNoneOutlinedIcon className='opacityLow' />
        <SettingsOutlinedIcon className='opacityLow' />
      </div>
    </header>
  )
}

export default Header