import React from 'react';
import { Container } from 'react-bootstrap';
import BestSellers from '../components/BestSellers';
import CategoryList from '../components/CategoryList';
import NewArrivals from '../components/NewArrivals';
import Landing from '../components/Landing';
import MostRated from '../components/MostRated';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Landing />
            <Container fluid className='mt-5'>
                <MostRated />
                <NewArrivals />
                <BestSellers />
                <CategoryList />
            </Container>
            <Footer />
        </>
    );
};

export default Home;
