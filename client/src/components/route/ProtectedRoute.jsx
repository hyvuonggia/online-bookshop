import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoadingRedirect from '../LoadingRedirect';

const ProtectedRoute = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;

    return user && user.token ? <Outlet /> : <LoadingRedirect />;
};

export default ProtectedRoute;