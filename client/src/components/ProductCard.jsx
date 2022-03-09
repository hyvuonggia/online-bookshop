import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Card className='m-3 p-1 rounded' style={{ width: 'fit-content' }}>
            <Link to={`/product/${product.slug}`}>
                <Card.Img
                    src={product.image.url}
                    variant='top'
                    style={{
                        height: '150px',
                        width: '250px',
                        objectFit: 'contain',
                    }}
                />
            </Link>
            <Card.Body>
                <Link
                    to={`/product/${product.slug}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <Card.Title as='div'>
                        <strong>{product.title}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    {' '}
                    {product.description.length < 15
                        ? product.description
                        : `${product.description.substring(0, 15)}...`}
                </Card.Text>
                <Card.Text as='h3'>${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
