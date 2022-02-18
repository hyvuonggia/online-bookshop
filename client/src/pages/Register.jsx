import { sendSignInLinkToEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
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
        <FormContainer>
            <h1>Register</h1>
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
                        Please use a valid email
                    </Form.Text>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>
                    Register
                </Button>
            </Form>
        </FormContainer>
    );
};

export default Register;
