import { sendSignInLinkToEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await sendSignInLinkToEmail(auth, email, config);

        window.localStorage.setItem('registrationEmail', email);

        toast.success(`A confirmation email has been sent to ${email}`);

        setEmail('');
    };

    return (
        <Container>
            <Row className='justify-content-md-center m-auto'>
                <Col xs={12} md={5}>
                    <h4>Register</h4>
                    {/* <ToastContainer/> */}
                    <Form onSubmit={handleSubmit} method='post'>
                        <Form.Group>
                            <Form.Control
                                type='email'
                                placeholder='Enter email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className='text-muted'>
                                Please provide valid email
                            </Form.Text>
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='primary'
                            className='mt-2'
                        >
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

        // <div className="">Register</div>
    );
};

export default Register;
