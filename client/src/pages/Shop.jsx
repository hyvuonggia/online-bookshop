import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getCategories, getCategory } from '../actions/categoryActions';
import { GET_CATEGORY_RESET } from '../constants/categoryConstants';

const Shop = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const { products: productsList } = useSelector(
        (state) => state.getProducts,
    );
    const { categories: categoriesList } = useSelector(
        (state) => state.getCategories,
    );

    const { category: categoryDetail } = useSelector(
        (state) => state.getCategory,
    );

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        setLoading(true);
        dispatch({
            type: GET_CATEGORY_RESET,
        });
        if (productsList.length === 0) {
            dispatch(getProducts());
        } else {
            setProducts(productsList);
            setLoading(false);
        }
    }, [dispatch, productsList, categoryDetail]);

    useEffect(() => {
        if (categoryDetail) {
            setProducts(categoryDetail.products);
            setLoading(false);
        }
    }, [categoryDetail]);

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value.toLowerCase());
    };

    const searchedKeyword = (keyword) => (p) =>
        p.title.toLowerCase().includes(keyword);

    const handleCheck = (e) => {
        setLoading(true);
        if (e.target.value === 'all') {
            dispatch(getProducts());
        } else {
            dispatch(getCategory(e.target.value));
        }
    };

    return (
        <Container fluid>
            <Row className='me-0'>
                <Col lg={2} sm={2}>
                    <Form.Group className='my-3'>
                        <Form.Label>Search</Form.Label>
                        <Form.Control
                            onChange={handleKeywordChange}
                            placeholder='Enter book title'
                        />
                    </Form.Group>
                    <hr />
                    <Form.Group className='my-3'>
                        <Form.Label>Category</Form.Label>
                        <Form.Check
                            type='radio'
                            label='All'
                            name='category'
                            value='all'
                            onChange={handleCheck}
                        />
                        {categoriesList.map((category) => (
                            <Form.Check
                                type='radio'
                                label={category.name}
                                name='category'
                                value={category.slug}
                                key={category._id}
                                onChange={handleCheck}
                            />
                        ))}
                    </Form.Group>
                </Col>
                {loading ? (
                    <Loader />
                ) : (
                    <Col>
                        {products.length === 0 && (
                            <Alert variant='warning'>
                                Can not find books with your filter
                            </Alert>
                        )}
                        <Row>
                            {products
                                .filter(searchedKeyword(keyword))
                                .map((product) => (
                                    <Col lg={4} key={product._id}>
                                        <ProductCard product={product} />
                                    </Col>
                                ))}
                        </Row>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Shop;
