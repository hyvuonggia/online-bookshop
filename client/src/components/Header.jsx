import React, { Fragment } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div>
            <Navbar variant='dark' bg='dark' expand='lg'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                src='/logo.svg'
                                width='30'
                                height='30'
                                className='d-inline-block align-top me-1'
                                alt='logo'
                            />
                            Bookshop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {user ? (
                                <Fragment>
                                    <NavDropdown
                                        title={`Welcome ${
                                            user.email.split('@')[0]
                                        }`}
                                        id='basic-nav-dropdown'
                                        className='pt-2'
                                    >
                                        <NavDropdown.Item href='#action/3.1'>
                                            Action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='#action/3.2'>
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='#action/3.3'>
                                            Something
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href='#action/3.4'>
                                            Separated link
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Button
                                        className='logout-btn mt-2'
                                        variant='danger'
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </Button>
                                </Fragment>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className='fas fa-user me-1'></i>
                                            Login
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link>
                                            <i className='fa-solid fa-user-plus me-1'></i>
                                            Register
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
