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
                <Col lg={4} className='pe-3 d-flex justify-content-center'>
                    <img
                        src={product && product.image.url}
                        alt='bookcover'
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col className='ms-5'>
                    <h3>{product.title}</h3>
                    <hr></hr>
                    <p>
                        {product.description
                            ? product.description
                            : 'No Description'}
                    </p>
                    <Row>
                        <Col lg={6}>
                            <table className='w-100'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Author:</strong>
                                        </td>
                                        <td className='float-end'>
                                            {product.author}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Category:</strong>
                                        </td>
                                        <td className='float-end'>
                                            {product.category
                                                ? product.category.name
                                                : 'Unknown'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>In Stock:</strong>
                                        </td>
                                        <td className='float-end'>
                                            {product.quantity}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Sold:</strong>
                                        </td>
                                        <td className='float-end'>
                                            {product.sold}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Price:</strong>
                                        </td>
                                        <td className='float-end'>
                                            ${product.price}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col>
                            <Button className='w-100 p-3' variant='info'>
                                <i className='fas fa-heart me-2' />
                                Add to Wishlist
                            </Button>
                            <br />
                            <Button className='w-100 p-3 mt-4' variant='dark'>
                                <i className='fas fa-cart-shopping me-2' />
                                Add to Cart
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
