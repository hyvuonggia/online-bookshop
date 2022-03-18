import {
    getIdTokenResult,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth, googleAuthProvider } from '../firebase';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOGGED_IN_USER } from '../constants/userConstants';
import { createUser } from '../actions/userActions';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;

    useEffect(() => {
        if (user && user.token) {
            navigate('/');
        }
    }, [user, navigate]);

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

            dispatch(createUser(idTokenResult.token)).then((res) => {
                dispatch({
                    type: LOGGED_IN_USER,
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult,
                        role: res.data.role,
                        _id: res.data._id,
                    },
                });
                if (res.data.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/history');
                }
            });

            toast.success('Login successful');
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
                dispatch(createUser(idTokenResult.token)).then((res) => {
                    dispatch({
                        type: LOGGED_IN_USER,
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult,
                            role: res.data.role,
                            _id: res.data._id,
                        },
                    });
                    if (res.data.role === 'admin') {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/user/history');
                    }
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
            <FormContainer>
                {loading ? (
                    <h1 className='my-5'>Loading...</h1>
                ) : (
                    <h1 className='my-5'>Login</h1>
                )}
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
                        variant='dark'
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
                <div className='mt-2'>
                    <Link to='/forgot/password'>Forgot your password?</Link>
                </div>
            </FormContainer>
        </>
    );
};

export default Login;
