import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    ListGroup,
    Row,
    Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCart } from '../actions/cartActions';
import { saveUserAddress } from '../actions/userActions';

const Checkout = () => {
    const dispatch = useDispatch();

    const [cart, setCart] = useState({
        products: [],
        cartTotal: 0,
    });
    const [loading, setLoading] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const { cart: cartDetail } = useSelector((state) => state.getCart);
    const { user } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (!cartDetail) {
            dispatch(getCart());
        } else {
            setCart(cartDetail);
        }
    }, [cartDetail, dispatch]);

    useEffect(() => {
        const fetchAddress = async () => {
            const config = {
                headers: {
                    Authorization: user.token.token,
                },
            };

            const { data } = await axios.get('/api/users/user/address', config);
            setShippingAddress(data);
        };
        fetchAddress();
    }, [user.token.token]);

    const saveAddressToDb = (e) => {
        e.preventDefault();
        console.log('Save address');
        console.log(shippingAddress);
        setLoading(true);
        dispatch(saveUserAddress(shippingAddress))
            .then(() => {
                setLoading(false);
                toast.success('Address saved');
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                toast.error('Address saved fail');
            });
    };

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <h2 className='my-5'>Shipping address</h2>
                    <Form>
                        <FormGroup controlId='address'>
                            <FormLabel>Address</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter address'
                                name='address'
                                value={shippingAddress.address}
                                required
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='city'>
                            <FormLabel>City</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter city'
                                name='city'
                                value={shippingAddress.city}
                                required
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='postalCode'>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter postal code'
                                name='postalCode'
                                value={shippingAddress.postalCode}
                                required
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='country'>
                            <FormLabel>Country</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Enter country'
                                name='country'
                                value={shippingAddress.country}
                                required
                                onChange={handleChange}
                            ></FormControl>
                        </FormGroup>
                        <br />
                        <Button
                            variant='dark'
                            onClick={saveAddressToDb}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as='span'
                                        animation='border'
                                        size='sm'
                                        role='status'
                                        aria-hidden='true'
                                    />{' '}
                                    Loading
                                </>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Form>
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
