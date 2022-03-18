import {
    getIdTokenResult,
    signInWithEmailLink,
    updatePassword,
    updateProfile,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { LOGGED_IN_USER } from '../constants/userConstants';
import { auth } from '../firebase';

const RegisterComplete = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail(window.localStorage.getItem('registrationEmail'));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!email || !password) {
            toast.error('Email and password is required');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 character long');
            return;
        }

        try {
            const result = await signInWithEmailLink(
                auth,
                email,
                window.location.href,
            );
            if (result.user.emailVerified) {
                // remove user email from local storage
                window.localStorage.removeItem('registrationEmail');

                // get user id token
                let user = auth.currentUser;
                await updatePassword(user, password);
                await updateProfile(user, {
                    displayName: email.split('@')[0],
                });
                const idTokenResult = await getIdTokenResult(user);
                // console.log('user', user, 'idTokenResult', idTokenResult);

                toast.success('Registration completed');

                //redux store
                dispatch(createUser(idTokenResult.token)).then((res) =>
                    dispatch({
                        type: LOGGED_IN_USER,
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult,
                            role: res.data.role,
                            _id: res.data._id,
                        },
                    }),
                );

                // redirect
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <FormContainer>
            <h1 className='my-5'>Complete your registration</h1>
            <Form onSubmit={handleSubmit} method='post'>
                <Form.Group>
                    <Form.Control
                        type='email'
                        placeholder='Enter email address'
                        value={email}
                        disabled
                    />
                </Form.Group>
                <Form.Group className='my-3'>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Text className='text-muted'>
                        Password must be at least 6 character long
                    </Form.Text>
                </Form.Group>
                <Button
                    type='submit'
                    variant='dark'
                    className='mt-2'
                    disabled={!password || password.length < 6}
                >
                    Register
                </Button>
            </Form>
        </FormContainer>
    );
};

export default RegisterComplete;
