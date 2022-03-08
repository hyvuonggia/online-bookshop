import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import ProductCard from '../components/ProductCard';

const NewArrivals = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.getProducts);

    useEffect(() => {
        dispatch(getProducts('createdAt', 'desc', 4));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <h2 className='text-center p-4'>New Arrivals</h2>
            <Row>
                {products.map((product) => (
                    <Col
                        key={product._id}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
            <hr />
        </>
    );
};

export default NewArrivals;
