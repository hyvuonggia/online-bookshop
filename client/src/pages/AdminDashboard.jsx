import React, { useEffect, useState } from 'react';
import { Alert, Card, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, setOrderStatus } from '../actions/adminActions';
import Loader from '../components/Loader';

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const { orders, error } = useSelector((state) => state.getOrders);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getOrders()).then(() => setLoading(false));
    }, []);

    const handleSetOrderStatus = (orderId, status) => {
        console.log(orderId, status);
        dispatch(setOrderStatus(orderId, status));
    };

    return (
        <Container>
            <h1 className='py-5'>Orders</h1>
            {error ? (
                <Alert variant='danger'>{error}</Alert>
            ) : loading ? (
                <Loader />
            ) : (
                orders.map((order) => (
                    <Card className='mb-5' key={order._id}>
                        <Card.Header>{order._id}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Ordered by: {order.orderedBy.name}
                            </Card.Text>
                            <Card.Text>
                                Email: {order.orderedBy.email}
                            </Card.Text>
                            <Card.Text>
                                Order date: {order.createdAt.substring(0, 10)}
                            </Card.Text>
                            <Form.Label>Status:</Form.Label>
                            <Form.Select
                                style={{
                                    width: 'fit-content',
                                }}
                                onChange={(e) =>
                                    handleSetOrderStatus(
                                        order._id,
                                        e.target.value,
                                    )
                                }
                            >
                                <option value=''>{order.orderStatus}</option>
                                <option value='Not processed'>
                                    Not processed
                                </option>
                                <option value='Processing'>Processing</option>
                                <option value='Ready to deliver'>
                                    Ready to deliver
                                </option>
                                <option value='Delivering'>Delivering</option>
                                <option value='Completed'>Completed</option>
                                <option value='Cancelled'>Cancelled</option>
                            </Form.Select>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default AdminDashboard;
