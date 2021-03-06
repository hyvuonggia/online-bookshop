import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import '../css/ProductCard.scss';
import { LinkContainer } from 'react-router-bootstrap';

const ProductCard = ({ product }) => {
    return (
        <LinkContainer
            to={`/product/${product.slug}`}
            className='text-center w-100'
        >
            <Card
                className='m-3 p-3 rounded text-center h-100'
                style={{ width: '250px' }}
            >
                <Card.Img
                    src={
                        product.image
                            ? product.image.url
                            : 'https://crossfitbbros.com/bbros-1/wp-content/uploads/2021/01/no-photo-available.png'
                    }
                    variant='top'
                    style={{
                        height: '150px',
                        width: 'auto',
                        objectFit: 'contain',
                    }}
                />
                <Card.Body className='p-0 mt-2'>
                    <Card.Title as='h4'>
                        <strong>{product.title}</strong>
                    </Card.Title>
                    <Rating value={product.rating} />{' '}
                    {`(${product.numReviews} reviews)`}
                    {/* <Card.Text as='div'>
                        {' '}
                        {product.description.length < 15
                            ? product.description
                            : `${product.description.substring(0, 15)}...`}
                    </Card.Text> */}
                    <br />
                    <br />
                    <Card.Text
                        as='h3'
                        className='position-absolute bottom-0 start-50 translate-middle-x'
                    >
                        <strong>$ {product.price}</strong>
                    </Card.Text>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
};

export default ProductCard;
