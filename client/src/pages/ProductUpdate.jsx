import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../actions/productActions';
import FileUpload from '../components/FileUpload';
import FormContainer from '../components/FormContainer';

const ProductUpdate = () => {
    const dispatch = useDispatch();
    const match = useParams();

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
        if (!productDetail) {
            dispatch(getProduct(match.slug));
        } else {
            setProduct(productDetail);
        }

        // dispatch(getProduct(match.slug)).then((p) => {
        //     setProduct({ ...product, ...p.data });
        // });
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
    };
    return (
        <FormContainer onSubmit>
            <h1>Update Product</h1>
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
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
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

export default ProductUpdate;
