import React from 'react';
import { Container } from 'react-bootstrap';
import BestSellers from '../components/BestSellers';
import CategoryList from '../components/CategoryList';
import NewArrivals from '../components/NewArrivals';
import Landing from '../components/Landing';

const Home = () => {
    return (
        <>
            <Landing />
            <Container fluid className='mt-5'>
                <NewArrivals />
                <BestSellers />
                <CategoryList />
            </Container>
        </>
    );
};

export default Home;
