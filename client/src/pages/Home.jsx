import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsLimit } from '../actions/productActions';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.getProductsLimit);

    useEffect(() => {
        dispatch(getProductsLimit(8));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container>
            <Row>
                {products.map((product) => (
                    <Col
                        key={product._id}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
