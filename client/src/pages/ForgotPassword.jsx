import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { auth } from '../firebase';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;

    useEffect(() => {
        if (user && user.token) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        };
        await sendPasswordResetEmail(auth, email, config)
            .then(() => {
                setEmail('');
                toast.success(
                    'A password reset link has been sent to your email address',
                );
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <FormContainer>
            <h1>Reset password</h1>
            <Form onSubmit={handleSubmit} method='post' className='mt-5'>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className='text-muted'>
                        Enter the email address that you need to recover your
                        password
                    </Form.Text>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>
                    Submit
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ForgotPassword;
