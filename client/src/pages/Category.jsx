import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory } from '../actions/categoryActions';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

const Category = () => {
    const match = useParams();
    const dispatch = useDispatch();

    const { category: categoryDetail } = useSelector(
        (state) => state.getCategory,
    );

    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        category: {},
        products: [],
    });

    useEffect(() => {
        setLoading(true);
        if (!categoryDetail || categoryDetail.category.slug !== match.slug) {
            dispatch(getCategory(match.slug)).then(() => setLoading(false));
        } else {
            setCategory(categoryDetail);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryDetail]);

    return loading ? (
        <Loader />
    ) : (
        <>
            <h1 className='text-center my-5'>{`${category.products.length} Book(s) With This Category`}</h1>
            <Container>
                <Row>
                    {category.products.map((product) => (
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
            </Container>
            {/* {JSON.stringify(category)} */}
        </>
    );
};

export default Category;
