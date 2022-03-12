import React from 'react';
import { Container } from 'react-bootstrap';
import BestSellers from '../components/BestSellers';
import CategoryList from '../components/CategoryList';
import NewArrivals from '../components/NewArrivals';
import Welcome from '../components/Welcome';

const Home = () => {
    return (
        <>
            <Welcome />
            <Container className='mt-5'>
                <NewArrivals />
                <BestSellers />
                <CategoryList />
            </Container>
        </>
    );
};

export default Home;
