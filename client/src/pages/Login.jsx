import {
    getIdTokenResult,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth, googleAuthProvider } from '../firebase';
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

    const googleLogin = async () => {
        signInWithPopup(auth, googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
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
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            });
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
                        <Form.Text>
                            Password must be at least 6 characters long
                        </Form.Text>
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='primary'
                        className='login-btn mb-3'
                        disabled={!email || password.length < 6}
                    >
                        <i className='fa-solid fa-xl fa-envelope me-2'></i>
                        Login with Email/Password
                    </Button>
                </Form>
                <Button
                    type='submit'
                    variant='danger'
                    className='login-btn'
                    onClick={googleLogin}
                >
                    <i className='fa-brands fa-xl fa-google me-2'></i>
                    Login with Google account
                </Button>
            </FormContainer>
        </>
    );
};

export default Login;
