import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCreatedDate } from '../actions/productActions';
// import { getProducts } from '../actions/productActions';
import ProductCard from '../components/ProductCard';
import Loader from './Loader';

const NewArrivals = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.getProductsByCreatedDate);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getProductsByCreatedDate()).then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <h2 className='text-center p-4'>NEW ARRIVALS</h2>
            {loading ? (
                <Loader />
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col
                            key={product._id}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
            <br />
            <hr />
        </>
    );
};

export default NewArrivals;
