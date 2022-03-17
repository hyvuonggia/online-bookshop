import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/Landing.scss';

const Landing = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <Carousel.Caption>
                    <h1>Welcome</h1>
                    <LinkContainer to={'/shop'}>
                        <Button className='mt-5 p-3 ' variant='light'>
                            <h3 className='mb-0'>Shop Now</h3>
                        </Button>
                    </LinkContainer>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Carousel.Caption>
                    <h1>Our best books</h1>
                    <a href='#most-rated'>
                        <Button className='mt-5 p-3 ' variant='light'>
                            <h3 className='mb-0'>View</h3>
                        </Button>
                    </a>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Landing;
