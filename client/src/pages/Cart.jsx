import React, { useEffect } from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Image,
    ListGroup,
    Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

const Cart = () => {
    const match = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if (match.slug) {
            dispatch(addToCart(match.slug));
        }
    }, [dispatch, match.slug]);

    const handleRemoveFromCart = (slug) => {
        dispatch(removeFromCart(slug));
    };

    const handleCheckout = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h1 className='my-5'>Cart</h1>
                    {cartItems.length === 0 ? (
                        <Alert variant='warning'>Your cart is empty</Alert>
                    ) : (
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={2} className='text-center'>
                                        <strong>Image</strong>
                                    </Col>
                                    <Col md={5}>
                                        <strong>Title</strong>
                                    </Col>
                                    <Col md={2} className='text-center'>
                                        <strong>Author</strong>
                                    </Col>
                                    <Col md={2} className='text-center'>
                                        <strong>Price</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2} className='text-center'>
                                            <Image
                                                src={item.image}
                                                alt='item.name'
                                                height={100}
                                            />
                                        </Col>
                                        <Col md={5}>
                                            <strong>{item.title}</strong>
                                        </Col>
                                        <Col md={2} className='text-center'>
                                            {item.author}
                                        </Col>
                                        <Col md={2} className='text-center'>
                                            $ {item.price}
                                        </Col>
                                        <Col md={1}>
                                            {' '}
                                            <Button
                                                variant='danger'
                                                className='py-4'
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        item.slug,
                                                    )
                                                }
                                            >
                                                <i className='fas fa-trash' />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
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
                                disabled={cartItems.length === 0}
                                onClick={handleCheckout}
                                variant='dark'
                            >
                                <h5 className='m-0 p-0 text-light'>
                                    <i className='fas fa-credit-card me-2' />
                                    Proceed to Checkout
                                </h5>
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item className='text-center'>
                            <Button
                                type='button'
                                className='w-100'
                                disabled={cartItems.length === 0}
                                variant='secondary'
                            >
                                <h5 className='m-0 p-0'>
                                    <i className='fas fa-money-bill me-2' />
                                    Cash on Delivery
                                </h5>
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
