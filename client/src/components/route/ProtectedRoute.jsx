import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoadingRedirect from '../LoadingRedirect';

const ProtectedRoute = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;
    
    return user && user.token ? (
        <Fragment>
            <Outlet />
        </Fragment>
    ) : (
        <LoadingRedirect />
    );
};

export default ProtectedRoute;
