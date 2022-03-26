import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { createOrder } from '../actions/orderActions';
import { APPLY_COUPON_TO_CART_RESET } from '../constants/cartConstants';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userLogin);
    const { totalAfterDiscount } = useSelector(
        (state) => state.applyCouponToCart,
    );

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const createPaymentIntent = async () => {
            const config = {
                headers: {
                    Authorization: user.token.token,
                },
            };

            const response = await axios.post(
                '/api/stripe/create-payment-intent',
                { totalAfterDiscount },
                config,
            );
            return response;
        };

        createPaymentIntent().then((res) => {
            // console.log('create payment intent', res.data);
            setClientSecret(res.data.clientSecret);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log('submit');

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                },
            },
        });

        if (payload.error) {
            //handle error
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            dispatch(createOrder(payload));
            dispatch({
                type: APPLY_COUPON_TO_CART_RESET,
            });
            localStorage.removeItem('cartItems');
            // console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };
    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '');
    };

    return (
        <div>
            <Form
                className='stripe-form'
                id='payment-form'
                onSubmit={handleSubmit}
            >
                {error && <Alert variant='danger'>{error}</Alert>}
                {succeeded && (
                    <Alert variant='success'>Payment successful!</Alert>
                )}
                <CardElement
                    id='card-element'
                    // options={cardStyle}
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    className='stripe-button mt-3'
                    disabled={processing || disabled || succeeded}
                >
                    {processing ? (
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
                        'Pay'
                    )}
                </Button>
            </Form>
        </div>
    );
};

export default CheckoutForm;
