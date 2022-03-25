import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
    Table,
} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCoupon,
    deleteCoupon,
    getCoupons,
} from '../actions/couponActions';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Coupon = () => {
    const dispatch = useDispatch();

    const { coupons } = useSelector((state) => state.getCoupons);

    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState(new Date());
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingGetCoupons, setLoadingGetCoupons] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getCoupons()).then(() => setLoading(false));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingGetCoupons(true);
        dispatch(createCoupon({ name, expiry, discount }))
            .then(() => {
                dispatch(getCoupons()).then(() => setLoadingGetCoupons(false));
                setName('');
                setExpiry('');
                setDiscount('');
                toast.success('Coupon created');
            })
            .catch((error) => {
                toast.error(error.message);
                setLoadingGetCoupons(false);
            });
    };

    const handleDelete = (couponId) => {
        setLoadingDelete(true);
        dispatch(deleteCoupon(couponId)).then(() => {
            dispatch(getCoupons()).then(() => setLoadingDelete(false));
        });
    };

    return loading ? (
        <Loader />
    ) : (
        <Container>
            <Row>
                <Col>
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
                            Save
                        </Button>
                    </Form>
                </Col>
                <Col>
                    {loadingDelete ? (
                        <h3 className='my-5'>Deleting...</h3>
                    ) : (
                        <h3 className='my-5'>Coupon list</h3>
                    )}

                    {coupons && coupons.length === 0 ? (
                        <Alert variant='warning'>No coupons</Alert>
                    ) : loadingGetCoupons ? (
                        <Loader />
                    ) : (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Discount (%)</th>
                                    <th>Expiry date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons &&
                                    coupons.map((coupon) => (
                                        <tr key={coupon._id}>
                                            <td width='40%'>
                                                <strong>{coupon.name}</strong>
                                            </td>
                                            <td width='30%'>
                                                {coupon.discount}
                                            </td>
                                            <td width='100%'>
                                                {coupon.expiry.substring(0, 10)}
                                            </td>
                                            <td width='fit-content'>
                                                <Button
                                                    variant='danger'
                                                    onClick={() =>
                                                        handleDelete(coupon._id)
                                                    }
                                                >
                                                    <i className='fas fa-trash' />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Coupon;
