import React from 'react'

import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

import { Outlet, useLocation } from "react-router-dom";
import TodayTodos from '../../pages/dashboard/TodayTodos';

const MainLayout = () => {
    const href = window.location.href
    if(href === "/") {
        console.log(ok);
    }
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <>
            <Header />
            <Sidebar />
            {pathname === '/' ?
            <div className='main'>
            <TodayTodos />
            </div>
            :
            ''
            }
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout