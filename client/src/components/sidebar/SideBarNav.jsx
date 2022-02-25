import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SideBarNav.scss';

const SideBarNav = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;

    return user.role === 'admin' ? (
        <div className='sidebar'>
            <div className='sidebar-menu'>
                <div className='sidebar-menu-indicator'>
                    <Link
                        to='/admin/dashboard'
                        key='dashboard'
                        style={{ textDecoration: 'none' }}
                    >
                        <div className='sidebar-menu-item'>
                            <div className='sidebar-menu-item-text'>
                                Dashboard
                            </div>
                        </div>
                    </Link>
                    <Link
                        to='/admin/product'
                        key='product'
                        style={{ textDecoration: 'none' }}
                    >
                        <div className='sidebar-menu-item'>
                            <div className='sidebar-menu-item-text'>
                                Product
                            </div>
                        </div>
                    </Link>
                    <Link
                        to='/admin/products'
                        key='products'
                        style={{ textDecoration: 'none' }}
                    >
                        <div className='sidebar-menu-item'>
                            <div className='sidebar-menu-item-text'>
                                Products
                            </div>
                        </div>
                    </Link>
                    <Link
                        to='/admin/coupon'
                        key='coupon'
                        style={{ textDecoration: 'none' }}
                    >
                        <div className='sidebar-menu-item'>
                            <div className='sidebar-menu-item-text'>Coupon</div>
                        </div>
                    </Link>
                    <Link
                        to='/user/password'
                        key='password'
                        style={{ textDecoration: 'none' }}
                    >
                        <div className='sidebar-menu-item'>
                            <div className='sidebar-menu-item-text'>
                                Password
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    ) : (
        <div className='sidebar'>
            <div className='sidebar-menu'>
                <div className='sidebar-menu-indicator'>
                    <Link
                        to='/user/history'
                        key='history'
                        style={{ textDecoration: 'none' }}
                    >
                        <div className='sidebar-menu-item'>
                            <div className='sidebar-menu-item-text'>
                                Dashboard
                            </div>
                        </div>
                    </Link>
                    <Link
                        to='/user/wishlist'
                        key='history'
                        style={{ textDecoration: 'none' }}
                    >
                        <div className='sidebar-menu-item'>
                            <div className='sidebar-menu-item-text'>
                                Wishlist
                            </div>
                        </div>
                    </Link>
                    <Link
                        to='/user/password'
                        key='password'
                        style={{ textDecoration: 'none' }}
                    >
                        <div className='sidebar-menu-item'>
                            <div className='sidebar-menu-item-text'>
                                Password
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideBarNav;
