import React from 'react'

import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout