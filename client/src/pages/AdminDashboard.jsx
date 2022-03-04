import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsLimit } from '../actions/productActions';

const AdminDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsLimit(100));
    }, [dispatch]);

    const { products } = useSelector((state) => state.getProductsLimit);

    return (
        <div className='px-5'>
            <h1>Products</h1>
            <Row className='g-4' lg={5} md={2} sm={1}>
                {products.map((product) => (
                    <Col key={product._id}>
                        <Card style={{ height: '300px' }}>
                            <Card.Img
                                variant='top'
                                src={product.image.url}
                                style={{ height: '200px', width: 'auto' }}
                            />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AdminDashboard;
