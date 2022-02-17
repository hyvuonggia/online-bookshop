import {
    getIdTokenResult,
    signInWithEmailLink,
    updatePassword,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { auth } from '../firebase';

const RegisterComplete = () => {
    const navigate = useNavigate();

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
                const idTokenResult = await getIdTokenResult(user);
                // console.log('user', user, 'idTokenResult', idTokenResult);
                toast.success('Registration completed');

                //redux store

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
            <h4>Complete your registration</h4>
            <Form onSubmit={handleSubmit} method='post'>
                <Form.Group>
                    <Form.Control
                        type='email'
                        placeholder='Enter email address'
                        value={email}
                        disabled
                    />
                </Form.Group>
                <Form.Group className='mt-2'>
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
                <Button type='submit' variant='primary' className='mt-2'>
                    Register
                </Button>
            </Form>
        </FormContainer>
    );
};

export default RegisterComplete;
