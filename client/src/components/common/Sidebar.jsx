import React, { useState } from 'react'
import '../../assets/styles/common/Sidebar.css'

import appRoutes from '../../routes/appRoutes'

//Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav>
            <div className='nav__wrapper'>
                <ul>
                    {appRoutes && appRoutes.map((link, index) => (
                        <Link key={index} to={link.path}>
                            <li className={link.className}>
                                {link.icon}
                                {link.title}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </nav >
    )
}

export default Sidebar