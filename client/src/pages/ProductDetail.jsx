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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createReview, getProduct } from '../actions/productActions';
import { addToWishlist } from '../actions/userActions';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import { CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductDetail = () => {
    const match = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const [loading, setLoading] = useState(false);

    const [review, setReview] = useState({
        rating: 0,
        comment: '',
    });

    const { product: productDetail } = useSelector((state) => state.getProduct);

    const { user } = useSelector((state) => state.userLogin);

    const { success: successCreateReview, error: errorCreateReview } =
        useSelector((state) => state.createReview);

    useEffect(() => {
        setLoading(true);
        dispatch({ type: CREATE_REVIEW_RESET });
        if (!productDetail || productDetail.slug !== match.slug) {
            dispatch(getProduct(match.slug)).then(() => setLoading(false));
        } else {
            setProduct(productDetail);
            setLoading(false);
        }
    }, [dispatch, match.slug, productDetail, review]);

    useEffect(() => {
        if (successCreateReview) {
            toast.success('Review submitted');
            dispatch(getProduct(match.slug));
        }
    }, [dispatch, match.slug, successCreateReview]);

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

    const handleAddToCart = () => {
        navigate(`/cart/${match.slug}`);
    };

    const handleAddToWishlist = () => {
        console.log('add to wishlist');
        dispatch(addToWishlist(match.slug));
    };

    return (
        <Container className='p-5 h-100'>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Row>
                        <Col
                            lg={4}
                            className='pe-3 d-flex justify-content-center'
                        >
                            <img
                                src={
                                    product.image
                                        ? product.image.url
                                        : 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
                                }
                                alt='bookcover'
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col>
                            <h3>{product.title}</h3>
                            <Rating value={product.rating} />{' '}
                            {`(${product.numReviews} reviews)`}
                            <hr />
                            <Row>
                                <p>
                                    {product.description
                                        ? product.description
                                        : 'No Description'}
                                </p>
                            </Row>
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
                                                            ? product.category
                                                                  .name
                                                            : 'Unknown'}
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>In Stock:</strong>
                                                </td>
                                                <td className='float-end'>
                                                    {productDetail &&
                                                        productDetail.quantity}
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
                                    <Button
                                        className='w-100 p-3'
                                        variant='info'
                                        onClick={handleAddToWishlist}
                                    >
                                        <i className='fas fa-heart me-2' />
                                        Add to Wishlist
                                    </Button>
                                    <br />
                                    {product.quantity ? (
                                        <Button
                                            className='w-100 p-3 mt-4'
                                            variant='dark'
                                            onClick={handleAddToCart}
                                        >
                                            <i className='fas fa-cart-shopping me-2' />
                                            Add to Cart
                                        </Button>
                                    ) : (
                                        <Button
                                            className='w-100 p-3 mt-4'
                                            variant='dark'
                                            disabled
                                        >
                                            Out of stock
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                    <Row className='mt-5'>
                        {errorCreateReview && (
                            <Alert variant='danger'>{errorCreateReview}</Alert>
                        )}
                        {product.reviews.length === 0 && (
                            <Alert variant='warning'>No reviews yet</Alert>
                        )}
                        <h4 className='mb-4'>Leave a review</h4>
                        {user ? (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={review.rating}
                                        name='rating'
                                        onChange={handleChange}
                                        style={{
                                            width: 'fit-content',
                                            appearance: 'menulist',
                                        }}
                                    >
                                        <option value=''>
                                            ---Please select---
                                        </option>
                                        <option value='1'>1 - Very Bad</option>
                                        <option value='2'>2 - Bad</option>
                                        <option value='3'>3 - Average</option>
                                        <option value='4'>4 - Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group
                                    controlId='comment'
                                    className='mt-3'
                                >
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        row={4}
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
                                Please <Link to='/login'>sign in</Link> to write
                                review
                            </Alert>
                        )}
                        <ListGroup variant='flush' className='mt-3'>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <div>
                                        <Rating value={review.rating} text='' />
                                    </div>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default ProductDetail;
