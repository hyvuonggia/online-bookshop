import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Shop = () => {
    return (
        <Container fluid className='p-0'>
            <Row>
                <Col lg={2}>Sidebar</Col>
                <Col>Shop</Col>
            </Row>
        </Container>
    );
};

export default Shop;
