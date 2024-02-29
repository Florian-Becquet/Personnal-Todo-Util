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
                        <li key={index}>
                            {link.icon}
                            {link.title}
                            <ul>
                                {link.child.map((item, index) => (
                                    <Link key={index} to={item.path}><li>{item.name}</li></Link>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </nav >
    )
}

export default Sidebar