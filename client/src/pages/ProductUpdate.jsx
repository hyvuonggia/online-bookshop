import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategories } from '../actions/categoryActions';
import { getProduct, updateProduct } from '../actions/productActions';
import FileUpload from '../components/FileUpload';
import FormContainer from '../components/FormContainer';

const ProductUpdate = () => {
    const dispatch = useDispatch();
    const match = useParams();
    const navigate = useNavigate();

    const { product: productDetail } = useSelector((state) => state.getProduct);
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
        if (!productDetail || match.slug !== productDetail.slug) {
            dispatch(getProduct(match.slug));
        } else {
            setProduct(productDetail);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productDetail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(match.slug, product));
        toast.success('Updated');
        navigate('/admin/products');
    };
    return (
        <FormContainer onSubmit>
            <h1 className='my-5'>Update Product</h1>

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
                <Form.Group className='mt-2'>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type='text'
                        name='author'
                        value={product.author}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='mt-2'>
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
                <Form.Group className='mt-2'>
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
                <Form.Group className='mt-2'>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type='number'
                        name='quantity'
                        value={product.quantity}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Label>Category</Form.Label>
                    <Form.Select name='category' onChange={handleChange}>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mt-2'>
                    <FileUpload
                        product={product}
                        setProduct={setProduct}
                        setLoading={setLoading}
                    />
                </Form.Group>

                <Button
                    variant='dark'
                    type='submit'
                    className='mt-3'
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

export default ProductUpdate;
