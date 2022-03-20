import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../actions/cartActions';
import Loader from '../components/Loader';

const Checkout = () => {
    const dispatch = useDispatch();

    const [cart, setCart] = useState({
        products: [],
        cartTotal: 0,
    });
    const [loading, setLoading] = useState(false);

    const { cart: cartDetail } = useSelector((state) => state.getCart);

    useEffect(() => {
        // console.log('cartDetail', cartDetail);
        setLoading(true);
        if (!cartDetail) {
            dispatch(getCart());
        } else {
            setCart(cartDetail);
            setLoading(false);
        }
    }, [cartDetail, dispatch]);

    const saveAddressToDb = () => {};

    return loading ? (
        <Loader />
    ) : (
        <Container>
            <Row>
                <Col md={6}>
                    <h2 className='my-5'>Delivery address</h2>
                    textarea
                    <br />
                    <Button variant='dark' onClick={saveAddressToDb}>
                        Save
                    </Button>
                    <hr />
                    <h2>Apply Coupon</h2>
                    <br />
                    coupon input and apply coupon
                </Col>
                <Col md={6}>
                    <h2 className='my-5'>Order Summary</h2>
                    <ListGroup variant='flush'>
                        {cart.products.map((product) => (
                            <ListGroup.Item key={product._id}>
                                <Row>
                                    <Col>
                                        <div>{product.product.title}</div>
                                    </Col>
                                    <Col>
                                        <div className='float-end'>
                                            ${product.price}
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <h3>Total:</h3>
                                </Col>
                                <Col>
                                    <h3 className='float-end'>
                                        ${cart.cartTotal}
                                    </h3>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className='text-center'>
                            <Button
                                type='button'
                                className='w-100'
                                variant='secondary'
                            >
                                <h5 className='m-0 p-0'>
                                    <i className='fas fa-money-bill me-2' />
                                    Place Order
                                </h5>
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
