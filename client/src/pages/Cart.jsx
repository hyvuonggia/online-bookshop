import React, { useEffect } from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Image,
    ListGroup,
    Row,
    Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart, userCart } from '../actions/cartActions';
import { CASH_ON_DELIVERY } from '../constants/codConstants';

const Cart = () => {
    const match = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;

    useEffect(() => {
        if (match.slug) {
            dispatch(addToCart(match.slug));
        }
    }, [dispatch, match.slug]);

    const handleRemoveFromCart = (slug) => {
        dispatch(removeFromCart(slug));
    };

    console.log(JSON.stringify(cartItems, null, 4));

    const handleCheckout = () => {
        if (!user || !user.token) {
            navigate('/login?redirect=/cart');
        } else {
            dispatch(userCart(cartItems))
                .then((res) => {
                    // console.log('CART_POST_RES', res);
                    if (res.data.ok) {
                        navigate('/checkout');
                    }
                })
                .catch((error) => console.log('cart save error', error));
        }
    };

    const handleCashOnDelivery = () => {
        dispatch({
            type: CASH_ON_DELIVERY,
        });
        if (!user || !user.token) {
            navigate('/login?redirect=/cart');
        } else {
            dispatch(userCart(cartItems))
                .then((res) => {
                    // console.log('CART_POST_RES', res);
                    if (res.data.ok) {
                        navigate('/checkout');
                    }
                })
                .catch((error) => console.log('cart save error', error));
        }
    };

    return (
        <Container>
            <Row>
                <Col md={8} lg={8}>
                    <h1 className='my-5'>Cart</h1>
                    {cartItems.length === 0 ? (
                        <Alert variant='warning'>Your cart is empty</Alert>
                    ) : (
                        <Table responsive bordered>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item._id}>
                                        <td width='10%' className='text-center'>
                                            <Image
                                                src={
                                                    item.image
                                                        ? item.image
                                                        : 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
                                                }
                                                alt='item name'
                                                height={100}
                                            />
                                        </td>
                                        <td width='90%'>
                                            <strong>{item.title}</strong>
                                        </td>
                                        <td width='10%'>{item.author}</td>
                                        <td>$ {item.price}</td>
                                        <td>
                                            <Button
                                                variant='danger'
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        item.slug,
                                                    )
                                                }
                                            >
                                                <i
                                                    className='fas fa-trash'
                                                    style={{ height: '100%' }}
                                                />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
                <Col md={4}>
                    <h2 className='my-5'>{`Total (${cartItems.length}) books`}</h2>
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
                                onClick={handleCashOnDelivery}
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
