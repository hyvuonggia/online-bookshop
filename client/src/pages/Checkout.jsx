import React from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);

    const saveAddressToDb = () => {};

    return (
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
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <h3>Total:</h3>
                                </Col>
                                <Col>
                                    <h3 className='float-end'>
                                        $
                                        {cartItems.reduce(
                                            (acc, item) => acc + item.price,
                                            0,
                                        )}
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
