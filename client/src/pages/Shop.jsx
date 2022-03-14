import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');

    const { products } = useSelector((state) => state.getProducts);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value.toLowerCase());
    };

    const searchedKeyword = (keyword) => (p) =>
        p.title.toLowerCase().includes(keyword);

    return (
        <Container fluid>
            <Row className='me-0'>
                <Col lg={2} sm={2}>
                    <Form.Group>
                        <Form.Label>Search</Form.Label>
                        <Form.Control
                            onChange={handleKeywordChange}
                            placeholder='Enter book title'
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Row>
                        {products
                            .filter(searchedKeyword(keyword))
                            .map((product) => (
                                <Col lg={4} key={product._id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
