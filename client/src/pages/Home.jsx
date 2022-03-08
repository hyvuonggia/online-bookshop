import React from 'react';
import { Container } from 'react-bootstrap';
import BestSellers from '../components/BestSellers';
import NewArrivals from '../components/NewArrivals';

const Home = () => {
    return (
        <Container className='mt-5'>
            <NewArrivals />
            <BestSellers />
        </Container>
    );
};

export default Home;
