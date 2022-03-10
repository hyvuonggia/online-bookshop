import React, { useEffect, useState } from 'react';
import {
    Alert,
    Col,
    Container,
    Row,
    Button,
    ListGroup,
    Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createReview, getProduct } from '../actions/productActions';
import { CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductDetail = () => {
    const match = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: '',
        reviews: [],
        numReviews: 0,
    });

    const [review, setReview] = useState({
        rating: '',
        comment: '',
    });

    const { product: productDetail } = useSelector((state) => state.getProduct);

    const { user } = useSelector((state) => state.userLogin);

    const { success: successCreateReview, error: errorCreateReview } =
        useSelector((state) => state.createReview);

    useEffect(() => {
        if (!productDetail || productDetail.slug !== match.slug) {
            dispatch(getProduct(match.slug));
        } else {
            setProduct(productDetail);
        }
    }, [dispatch, match.slug, productDetail, review]);

    useEffect(() => {
        if (successCreateReview) {
            toast.success('Review submitted');
            dispatch({ type: CREATE_REVIEW_RESET });
        }
    }, [dispatch, successCreateReview]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReview(match.slug, review));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <Container className='p-5 h-100'>
            <Row>
                <Col lg={4} className='pe-3 d-flex justify-content-center'>
                    <img
                        src={product && product.image.url}
                        alt='bookcover'
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col className='ms-5'>
                    <h3>{product.title}</h3>
                    <hr></hr>
                    <p>
                        {product.description
                            ? product.description
                            : 'No Description'}
                    </p>
                    <Row>
                        <Col lg={6}>
                            <table className='w-100'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>Author:</strong>
                                        </td>
                                        <td className='float-end'>
                                            {product.author}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Category:</strong>
                                        </td>
                                        <td className='float-end'>
                                            <Link
                                                to={
                                                    product.category
                                                        ? `/category/${product.category.slug}`
                                                        : ''
                                                }
                                            >
                                                {product.category
                                                    ? product.category.name
                                                    : 'Unknown'}
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>In Stock:</strong>
                                        </td>
                                        <td className='float-end'>
                                            {product.quantity}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Sold:</strong>
                                        </td>
                                        <td className='float-end'>
                                            {product.sold}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Price:</strong>
                                        </td>
                                        <td className='float-end'>
                                            ${product.price}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                        <Col>
                            <Button className='w-100 p-3' variant='info'>
                                <i className='fas fa-heart me-2' />
                                Add to Wishlist
                            </Button>
                            <br />
                            <Button className='w-100 p-3 mt-4' variant='dark'>
                                <i className='fas fa-cart-shopping me-2' />
                                Add to Cart
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <h3>Reviews</h3>
                    {errorCreateReview && (
                        <Alert variant='danger'>{errorCreateReview}</Alert>
                    )}
                    {product.reviews.length === 0 && (
                        <Alert variant='warning'>No reviews yet</Alert>
                    )}
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Leave a review</h4>
                            {user ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={review.rating}
                                            name='rating'
                                            onChange={handleChange}
                                        >
                                            <option value=''>Select</option>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            row={3}
                                            name='comment'
                                            onChange={handleChange}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        variant='dark'
                                        type='submit'
                                        className='mt-2'
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <Alert variant='warning'>
                                    Please <Link to='/login'>sign in</Link> to
                                    write review
                                </Alert>
                            )}
                        </ListGroup.Item>
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <div>{review.rating}</div>
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
