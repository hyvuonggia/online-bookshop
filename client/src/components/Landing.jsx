import React from 'react';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/Landing.scss';

const Landing = () => {
    // return (
    //     <div className='background'>
    //         <Container className='my-auto'>
    //             <h1>Welcome</h1>
    //             <LinkContainer to={'/products'}>
    //                 <Button className='mt-5' variant='light'>
    //                     <h3 className='mb-0'>Shop Now</h3>
    //                 </Button>
    //             </LinkContainer>
    //         </Container>
    //     </div>
    // );
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
        </Carousel>
    );
};

export default Landing;
