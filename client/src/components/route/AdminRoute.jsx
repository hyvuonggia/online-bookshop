import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getCurrentAdmin } from '../../actions/userActions';
import LoadingRedirect from '../LoadingRedirect';

const AdminRoute = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            getCurrentAdmin(user.token.token)
                .then((res) => {
                    setOk(true);
                })
                .catch((error) => {
                    setOk(false);
                });
        }
    }, [user]);

    return ok ? (
        <Fragment>
            <Outlet />
        </Fragment>
    ) : (
        <LoadingRedirect />
    );
};

export default AdminRoute;
