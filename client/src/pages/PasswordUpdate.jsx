import { updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { auth } from '../firebase';

const PasswordUpdate = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await updatePassword(auth.currentUser, password)
            .then(() => {
                setLoading(false);
                setPassword('');
                toast.success('Password updated');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error);
            });
    };

    return (
        <FormContainer>
            {loading ? <h1>Loading...</h1> : <h1>Update password</h1>}
            <Form onSubmit={handleSubmit} method='post' className='mt-5'>
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
                    disabled={!password || password.length < 6 || loading}
                >
                    Submit
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PasswordUpdate;
