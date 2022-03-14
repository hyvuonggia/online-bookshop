import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { CREATE_PRODUCT_RESET } from '../constants/productConstants.js';
import { getCategories } from '../actions/categoryActions';
import FileUpload from '../components/FileUpload';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        success,
        product: createdProduct,
        error,
    } = useSelector((state) => state.createProduct);

    const { categories } = useSelector((state) => state.getCategories);

    const [product, setProduct] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch({
            type: CREATE_PRODUCT_RESET,
        });
        if (success) {
            toast.success(
                `Book with title "${createdProduct.title}" is created`,
            );
        } else {
            toast.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(product)).then(() => {
            navigate('/admin/products');
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <FormContainer onSubmit>
            <h1 className='mt-3'>Add new product</h1>
            <Form.Group>
                <FileUpload
                    product={product}
                    setProduct={setProduct}
                    setLoading={setLoading}
                />
            </Form.Group>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type='text'
                        name='title'
                        value={product.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type='text'
                        name='author'
                        value={product.author}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        as='textarea'
                        rows={5}
                        name='description'
                        value={product.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <InputGroup>
                        <InputGroup.Text variant='dark'>$</InputGroup.Text>
                        <Form.Control
                            type='number'
                            name='price'
                            value={product.price}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type='number'
                        name='quantity'
                        value={product.quantity}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select name='category' onChange={handleChange}>
                        <option value={null}>---Please select---</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button
                    className='mt-3'
                    variant='dark'
                    type='submit'
                    disabled={loading}
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
        </FormContainer>
    );
};

export default ProductCreate;
