import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySold } from '../actions/productActions';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const BestSellers = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.getProductsBySold);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getProductsBySold()).then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <h2 className='text-center p-4'>BEST SELLERS</h2>
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

export default BestSellers;
