import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Col, Container, Row } from 'react-bootstrap';
import CheckoutForm from '../components/CheckoutForm';
import '../css/Payment.scss';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
    return (
        <Container>
            <h1 className='my-5'>Payment</h1>
            <Elements stripe={stripePromise}>
                <Row>
                    <Col
                        className='d-flex justify-content-center'
                        md={{ span: 6, offset: 3 }}
                    >
                        <CheckoutForm />
                    </Col>
                </Row>
            </Elements>
        </Container>
    );
};

export default Payment;
