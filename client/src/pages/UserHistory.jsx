import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Alert, Table, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
            } catch (error) {
                setOrdersError(error.message);
            }
        };

        fetchOrders();
    }, [user.token.token]);

    const handleExportPDF = (orderId, date, total, products) => {
        const doc = new jsPDF();
        console.log(JSON.stringify(products, null, 4));
        doc.text(`ID: ${orderId}`, 10, 10);
        doc.text(`DATE: ${date}`, 10, 20);
        doc.text(`AMOUNT: $ ${total}`, 10, 30);
        autoTable(doc, {
            startY: 40,
            head: [['Title', 'Author', 'Price']],
            body: products.map((product) => {
                return [
                    product.product.title,
                    product.product.author,
                    product.product.price,
                ];
            }),
        });
        doc.save(`${orderId}.pdf`);
    };

    return (
        <Container>
            <h1 className='py-5'>Orders</h1>
            {ordersError && <Alert variant='danger'>{ordersError}</Alert>}
            {orders.length === 0 ? (
                <Alert variant='warning'>You have no orders</Alert>
            ) : (
                orders.map((order) => (
                    <Card key={order._id} id={order._id} className='mb-5'>
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
                                id={`table-${order._id}`}
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
                            <Button
                                onClick={() =>
                                    handleExportPDF(
                                        order._id,
                                        order.createdAt.substring(0, 10),
                                        order.paymentIntent.amount / 100,
                                        order.products,
                                    )
                                }
                                variant='info'
                            >
                                Export order to PDF
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default UserHistory;
