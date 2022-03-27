import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Alert, Table, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UserHistory = () => {
    const [orders, setOrders] = useState([]);
    const [ordersError, setOrdersError] = useState('');

    const { user } = useSelector((state) => state.userLogin);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: user.token.token,
                    },
                };
                const response = await axios.get('/api/orders/user', config);
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                setOrdersError(error.message);
            }
        };

        fetchOrders();
    }, [user.token.token]);

    return (
        <Container>
            <h1 className='py-5'>Orders</h1>
            {ordersError && <Alert variant='danger'>{ordersError}</Alert>}
            {orders.length === 0 ? (
                <Alert variant='warning'>You have no orders</Alert>
            ) : (
                orders.map((order) => (
                    <Card key={order._id} className='mb-5'>
                        <Card.Header className='text-center p-0'>
                            <strong>{order.createdAt.substring(0, 10)}</strong>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>ID: {order._id}</Card.Title>
                            <p>STATUS: {order.orderStatus}</p>
                            <p>TOTAL: $ {order.paymentIntent.amount / 100}</p>
                            <Table
                                bordered
                                responsive
                                className='table-sm'
                                size='sm'
                            >
                                <thead>
                                    <tr>
                                        <th>TITLE</th>
                                        <th>AUTHOR</th>
                                        <th>PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products.map((product) => (
                                        <tr key={product._id}>
                                            <td width='50%'>
                                                {product.product.title}
                                            </td>
                                            <td>{product.product.author}</td>
                                            <td>$ {product.product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button variant='info'>Export order to PDF</Button>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default UserHistory;
