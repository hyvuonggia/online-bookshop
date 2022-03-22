import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    ListGroup,
    Row,
    Spinner,
    Table,
} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, getCoupons } from '../actions/couponActions';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Coupon = () => {
    const dispatch = useDispatch();

    const { coupons } = useSelector((state) => state.getCoupons);

    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState(new Date());
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getCoupons()).then(() => setLoading(false));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(createCoupon({ name, expiry, discount }))
            .then(() => {
                setLoading(false);
                setName('');
                setExpiry('');
                setDiscount('');
                toast.success('Coupon created');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });
    };

    return loading ? (
        <Loader />
    ) : (
        <Container>
            <Row>
                <Col md={6}>
                    <h1 className='my-5'>Coupon</h1>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                autoFocus
                            />
                            <Form.Text>
                                Name must have 3-12 characters long!
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className='mt-2'>
                            <Form.Label>Discount (%)</Form.Label>
                            <Form.Control
                                type='number'
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                autoFocus
                                required
                            />
                            <Form.Text>Min: 0, Max: 100</Form.Text>
                        </Form.Group>
                        <Form.Group className='mt-2'>
                            <Form.Label>Expiry Date</Form.Label>
                            <DatePicker
                                className='form-control'
                                selected={expiry}
                                value={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                            />
                        </Form.Group>
                        <Button
                            className='my-3'
                            onClick={handleSubmit}
                            type='submit'
                            variant='dark'
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as='span'
                                        animation='border'
                                        size='sm'
                                        role='status'
                                        aria-hidden='true'
                                    />{' '}
                                    Loading
                                </>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <h3 className='my-5'>Coupon list</h3>
                    <Table>
                        <tbody>
                            {coupons &&
                                coupons.map((coupon) => (
                                    <tr key={coupon._id}>
                                        <td width='50%'>
                                            <strong>{coupon.name}</strong>
                                        </td>
                                        <td>{coupon.discount}%</td>
                                        <td
                                            width='100%'
                                            className='text-center'
                                        >
                                            {coupon.expiry.substring(0, 10)}
                                        </td>
                                        <td width='fit-content'>
                                            <Button variant='danger'>
                                                <i className='fas fa-trash' />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Coupon;
