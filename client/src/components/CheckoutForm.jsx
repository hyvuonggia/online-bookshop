import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

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
            console.log('create payment intent', res.data);
            setClientSecret(res.data.clientSecret);
        });
    }, []);

    const cardStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#32325d',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

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
            console.log(JSON.stringify(payload, null, 4));
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
            {error && <Alert variant='danger'>{error}</Alert>}
            {succeeded && <Alert variant='success'>Payment successful!</Alert>}
            <Form
                className='stripe-form'
                id='payment-form'
                onSubmit={handleSubmit}
            >
                <CardElement
                    id='card-element'
                    options={cardStyle}
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
