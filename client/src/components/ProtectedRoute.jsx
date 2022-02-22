import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;
    return user && user.token ? (
        <Fragment>
            <Outlet />
        </Fragment>
    ) : (
        <h1>Loading...</h1>
    );
};

export default ProtectedRoute;
