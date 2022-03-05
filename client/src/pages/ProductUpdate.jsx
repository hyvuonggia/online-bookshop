import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../actions/productActions';

const ProductUpdate = () => {
    const dispatch = useDispatch();
    const match = useParams();

    const { product } = useSelector((state) => state.getProduct);
    useEffect(() => {
        dispatch(getProduct(match.slug));
    });
    return <div>{JSON.stringify(product)}</div>;
};

export default ProductUpdate;
