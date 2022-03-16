import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { deleteProduct, getProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import {
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_RESET,
} from '../constants/productConstants';

const AllProducts = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.getProducts);
    const { success, product } = useSelector((state) => state.deleteProduct);
    const { success: updateSuccess } = useSelector(
        (state) => state.updateProduct,
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch({
            type: DELETE_PRODUCT_RESET,
        });
        setLoading(true);
        dispatch(getProducts()).then(() => setLoading(false));
        if (success) {
            dispatch(getProducts()).then(() => setLoading(false));
            toast.success(`Book "${product.title}" deleted`);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    useEffect(() => {
        if (updateSuccess) {
            dispatch(getProducts());
        }
        dispatch({
            type: UPDATE_PRODUCT_RESET,
        });
    }, [dispatch, updateSuccess]);

    const handleDelete = (slug) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(slug));
        }
    };

    return (
        <div className='px-5'>
            <h1 className='py-3 text-center'>Products</h1>
            <hr />
            {loading ? (
                <Loader />
            ) : (
                <Row className='g-4' lg={3}>
                    {products.map((product) => (
                        <Col key={product._id}>
                            <Card
                                style={{ minHeight: '350px', height: '100%' }}
                                className='p-1'
                            >
                                <Card.Img
                                    variant='top'
                                    src={
                                        product.image
                                            ? product.image.url
                                            : 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
                                    }
                                    style={{
                                        height: '200px',
                                        width: 'auto',
                                        objectFit: 'contain',
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text
                                        style={{
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                    >
                                        {/* {product.description.length < 30
                                            ? product.description
                                            : `${product.description.substring(
                                                  0,
                                                  30,
                                              )}...`} */}
                                        {product.description}
                                    </Card.Text>
                                    <br />
                                    <br />
                                    <ButtonGroup
                                        size='md'
                                        style={{ width: '100%' }}
                                        className='position-absolute bottom-0 start-50 translate-middle-x'
                                    >
                                        <LinkContainer
                                            to={`/admin/product/${product.slug}`}
                                        >
                                            <Button
                                                variant='dark'
                                                className='py-3'
                                            >
                                                <i className='fas fa-pen' />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            onClick={() =>
                                                handleDelete(product.slug)
                                            }
                                            className='py-3'
                                        >
                                            <i className='fas fa-trash' />
                                        </Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default AllProducts;
