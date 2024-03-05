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

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <header>
            <TodoForm showNav={showNav} setShowNav={setShowNav} />
        <div className='header__home'>
          {/* <MenuIcon /> */}
          <Link to="/"><HomeOutlinedIcon /></Link>
        </div>
        <div className='header__notifications'>
            <Button onClick={() => setShowNav(!showNav)} variant="contained">Ajouter une tâche</Button>
            {/* <AddCircleOutlinedIcon className='hide__lg'/> */}
            {/* <ArrowCircleRightIcon /> */}
            {/* <NotificationsNoneOutlinedIcon /> */}
        </div>
    </header>
  )
}

export default Header