import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsLimit } from '../actions/productActions';

const AdminDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsLimit(100));
    }, [dispatch]);

    const { products } = useSelector((state) => state.getProductsLimit);

    return (
        <div>
            <h1>Products</h1>
            {JSON.stringify(products)}
        </div>
    );
};

export default AdminDashboard;
