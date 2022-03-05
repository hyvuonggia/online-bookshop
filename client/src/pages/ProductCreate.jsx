import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { CREATE_PRODUCT_RESET } from '../constants/productConstants.js';
import { getCategories } from '../actions/categoryActions';
import FileUpload from '../components/FileUpload';

const ProductCreate = () => {
    const dispatch = useDispatch();

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
        dispatch({
            type: CREATE_PRODUCT_RESET,
        });
        if (success) {
            // window.location.reload();
            toast.success(
                `Book with title "${createdProduct.title}" is created`,
            );
        } else {
            toast.error(error);
        }
        dispatch(getCategories());
    }, [dispatch, createdProduct, success, error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(product));
        // setProduct({
        //     title: '',
        //     author: '',
        //     description: '',
        //     price: '',
        //     quantity: '',
        //     category: '',
        //     image: '',
        // });
        window.location.reload();
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
            <h1>Add new product</h1>
            <img
                src={
                    product.image
                        ? product.image.url
                        : 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
                }
                alt='preview'
                width='100px'
                height='auto'
            />
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
                    <InputGroup>
                        <InputGroup.Text variant='dark'>$</InputGroup.Text>
                        <Form.Control
                            type='number'
                            name='price'
                            value={product.price}
                            onChange={handleChange}
                            autoFocus
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
                        autoFocus
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
                    variant='dark'
                    type='submit'
                    disabled={
                        !product.title ||
                        !product.price ||
                        !product.quantity ||
                        !product.category ||
                        !product.image ||
                        loading
                    }
                >
                    Save
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ProductCreate;
