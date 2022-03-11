import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBarNav from '../SideBarNav';

const AppLayout = () => {
    return (
        <div
            style={{
                padding: '0px 0px 0px 210px',
            }}
        >
            <SideBarNav />
            <Outlet />
        </div>
    );
};

export default AppLayout;
