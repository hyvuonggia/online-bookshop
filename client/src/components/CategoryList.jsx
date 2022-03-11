import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import Loader from './Loader';

const CategoryList = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.getCategories);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        dispatch(getCategories()).then(() => setLoading(false));
    }, [dispatch]);

    return (
        <>
            <h2 className='text-center p-4'>CATEGORIES</h2>
            {loading ? <Loader /> : <Row>{JSON.stringify(categories)}</Row>}
        </>
    );
};

export default CategoryList;
