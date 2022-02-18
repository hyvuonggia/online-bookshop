import { getIdTokenResult, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGGED_IN_USER } from '../constants/userConstants';
import Loader from '../components/Loader';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            // console.log(user);
            const idTokenResult = await getIdTokenResult(user);
            dispatch({
                type: LOGGED_IN_USER,
                payload: {
                    email: user.email,
                    token: idTokenResult,
                },
            });
            toast.success('Login successful');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <>
            {/* {loading && <Loader />} */}
            <FormContainer>
                <h1>Login</h1>
                <Form onSubmit={handleSubmit} method='post' className='mt-5'>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className='my-3'>
                        <Form.Label>Password</Form.Label>

                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='primary'
                        className='login-btn'
                        disabled={!email || password.length < 6}
                    >
                        Login
                    </Button>
                </Form>
            </FormContainer>
        </>
    );
};

export default Login;
