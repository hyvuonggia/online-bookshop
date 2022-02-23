import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBarNav from '../sidebar/SideBarNav';

const AppLayout = () => {
    return (
        <div
            style={{
                padding: '0px 0px 0px 200px',
            }}
        >
            <SideBarNav />
            <Outlet />
        </div>
    );
};

export default AppLayout;
