import React from 'react';
import { useEffect } from 'react';
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { deleteProduct, getProductsLimit } from '../actions/productActions';
import { DELETE_PRODUCT_RESET } from '../constants/productConstants';

const AllProducts = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.getProductsLimit);
    const { success, product } = useSelector((state) => state.deleteProduct);

    useEffect(() => {
        dispatch({
            type: DELETE_PRODUCT_RESET,
        });
        dispatch(getProductsLimit(100));
        if (success) {
            dispatch(getProductsLimit(100));
            toast.success(`Book "${product.title}" deleted`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, success]);

    const handleDelete = (slug) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(slug));
        }
    };

    return (
        <div className='p-5'>
            <h1>Products</h1>
            <Row className='g-4' lg={5} md={2} sm={1}>
                {products.map((product) => (
                    <Col key={product._id}>
                        <Card style={{ minHeight: '350px' }}>
                            <Card.Img
                                variant='top'
                                src={
                                    product.image
                                        ? product.image.url
                                        : 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
                                }
                                style={{ height: '200px', width: 'auto' }}
                            />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    {product.description.length < 20
                                        ? product.description
                                        : `${product.description.substring(
                                              0,
                                              20,
                                          )}...`}
                                </Card.Text>
                                <ButtonGroup
                                    size='md'
                                    style={{ width: '100%' }}
                                >
                                    <LinkContainer
                                        to={`/admin/product/${product.slug}`}
                                    >
                                        <Button variant='dark'>
                                            <i className='fas fa-pen' />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        onClick={() =>
                                            handleDelete(product.slug)
                                        }
                                    >
                                        <i className='fas fa-trash' />
                                    </Button>
                                </ButtonGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AllProducts;