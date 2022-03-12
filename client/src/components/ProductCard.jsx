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
                className='m-3 p-3 rounded text-center'
                style={{ width: '250px' }}
            >
                <Card.Img
                    src={product.image.url}
                    variant='top'
                    style={{
                        height: '150px',
                        width: 'auto',
                        objectFit: 'contain',
                    }}
                />
                <Card.Body>
                    <Card.Title as='div'>
                        <strong>{product.title}</strong>
                    </Card.Title>
                    <Rating value={product.rating} />{' '}
                    {`(${product.numReviews} reviews)`}
                    <Card.Text as='div'>
                        {' '}
                        {product.description.length < 15
                            ? product.description
                            : `${product.description.substring(0, 15)}...`}
                    </Card.Text>
                    <br />
                    <Card.Text as='h3' className='text-center'>
                        <strong>$ {product.price}</strong>
                    </Card.Text>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
};

export default ProductCard;
