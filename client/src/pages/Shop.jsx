import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getCategories, getCategory } from '../actions/categoryActions';
import { GET_CATEGORY_RESET } from '../constants/categoryConstants';
import '../css/Shop.scss';

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
        dispatch({
            type: GET_CATEGORY_RESET,
        });
    }, [categoryDetail, dispatch]);

    useEffect(() => {
        setLoading(true);
        if (productsList.length === 0) {
            dispatch(getProducts());
        } else {
            setProducts(productsList);
            setLoading(false);
        }
    }, [dispatch, productsList]);

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

    const handleSort = (e) => {
        dispatch(getProducts(e.target.value, e.target.dataset.order));
    };

    return (
        <Container fluid>
            <Row className='me-0'>
                <Col lg={2} sm={2}>
                    <div
                        id='side-bar'
                        // style={{
                        //     position: 'fixed',
                        // }}
                    >
                        <Form.Group className='my-3'>
                            <Form.Label>
                                <strong>Search</strong>
                            </Form.Label>
                            <Form.Control
                                onChange={handleKeywordChange}
                                placeholder='Enter book title'
                            />
                        </Form.Group>
                        <hr />
                        <Form.Group className='my-3'>
                            <Form.Label>
                                <strong>Category</strong>
                            </Form.Label>
                            <div
                                style={{
                                    height: '25vh',
                                    overflow: 'auto',
                                    // border: '2px black solid',
                                }}
                            >
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
                            </div>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                <strong>Sort</strong>
                            </Form.Label>
                            <Form.Check
                                name='sort'
                                value='rating'
                                data-order='desc'
                                label='Most popular'
                                type='radio'
                                onChange={handleSort}
                            />
                            <Form.Check
                                name='sort'
                                value='sold'
                                data-order='desc'
                                label='Best selling'
                                type='radio'
                                onChange={handleSort}
                            />
                            <Form.Check
                                name='sort'
                                value='price'
                                data-order='asc'
                                label='Lowest price'
                                type='radio'
                                onChange={handleSort}
                            />
                            <Form.Check
                                name='sort'
                                value='price'
                                data-order='desc'
                                label='Highest price'
                                type='radio'
                                onChange={handleSort}
                            />
                            <Form.Check
                                name='sort'
                                value='title'
                                data-order='asc'
                                label='Title [A-Z]'
                                type='radio'
                                onChange={handleSort}
                            />
                            <Form.Check
                                name='sort'
                                value='title'
                                data-order='desc'
                                label='Title [Z-A]'
                                type='radio'
                                onChange={handleSort}
                            />
                        </Form.Group>
                    </div>
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
                        <Row className='g-4'>
                            {products
                                .filter(searchedKeyword(keyword))
                                .map((product) => (
                                    <Col lg={3} key={product._id}>
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
