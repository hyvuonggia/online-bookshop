import React, { Fragment } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';
import '../css/Header.scss';

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
                                    title={`${user.email.split('@')[0]}`}
                                    id='basic-nav-dropdown'
                                    className='pt-2'
                                    menuVariant='dark'
                                >
                                    {user && user.role === 'user' ? (
                                        <LinkContainer
                                            to='/user/history'
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <NavDropdown.Item>
                                                Dashboard
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    ) : (
                                        <LinkContainer
                                            to='/admin/dashboard'
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <NavDropdown.Item>
                                                Dashboard
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    )}

                                    <LinkContainer
                                        to='/shop'
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <NavDropdown.Item>
                                            Shop
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer
                                        to='/user/password'
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <NavDropdown.Item>
                                            Password
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer
                                        to='/user/wishlist'
                                        style={{
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <NavDropdown.Item>
                                            Wishlist
                                        </NavDropdown.Item>
                                    </LinkContainer>
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
    );
};

export default Header;
