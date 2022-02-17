import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

const Register = () => {
    return (
        <Container>
            <Row className='justify-content-md-center m-auto'>
                <Col xs={12} md={6}>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type='email'
                                placeholder='Enter email address'
                            />
                            <Form.Text className='text-muted'>
                                Please provide valid email
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>

        // <div className="">Register</div>
    );
};

export default Register;
