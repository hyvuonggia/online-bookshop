import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../actions/categoryActions';
import Loader from './Loader';
import { LinkContainer } from 'react-router-bootstrap';

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
            {loading ? (
                <Loader />
            ) : (
                <Row>
                    {categories.map((category) => (
                        <Col className='text-center' key={category._id}>
                            <LinkContainer to={`/category/${category.slug}`}>
                                <Button>{category.name}</Button>
                            </LinkContainer>
                        </Col>
                    ))}
                </Row>
            )}
            <br />
            <hr />
        </>
    );
};

export default CategoryList;
