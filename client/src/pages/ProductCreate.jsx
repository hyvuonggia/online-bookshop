import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';

const ProductCreate = () => {
    const dispatch = useDispatch();

    const { success, product: createdProduct } = useSelector(
        (state) => state.createProduct,
    );

    const [product, setProduct] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        quantity: '',
        images: '',
        shipping: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(product));
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
            {success && toast.success(`"${createdProduct.title}" created`)}
            <h1>Add new product</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type='text'
                        name='title'
                        value={product.title}
                        onChange={handleChange}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type='text'
                        name='author'
                        value={product.author}
                        onChange={handleChange}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        name='description'
                        value={product.description}
                        onChange={handleChange}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='number'
                        name='price'
                        value={product.price}
                        onChange={handleChange}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type='number'
                        name='quantity'
                        value={product.quantity}
                        onChange={handleChange}
                        autoFocus
                    />
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Shipping</Form.Label>
                    <Form.Select name='shipping' onChange={handleChange}>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </Form.Select>
                </Form.Group> */}
                <Button variant='dark' type='submit'>
                    Save
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ProductCreate;
