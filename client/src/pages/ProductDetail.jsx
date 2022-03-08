import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../actions/productActions';

const ProductDetail = () => {
    const match = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: '',
    });

    const { product: productDetail } = useSelector((state) => state.getProduct);

    useEffect(() => {
        if (!productDetail || productDetail.slug !== match.slug) {
            dispatch(getProduct(match.slug));
        } else {
            setProduct(productDetail);
        }
    }, [dispatch, match.slug, productDetail]);

    return (
        <Container className='p-5 h-100'>
            <Row>
                <Col lg={4}>
                    <img
                        src={product && product.image.url}
                        alt='bookcover'
                        style={{ maxWidth: '400px' }}
                    />
                </Col>
                <Col lg={8}>Detail</Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
