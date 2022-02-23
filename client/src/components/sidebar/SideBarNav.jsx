import React from 'react';
import { Link } from 'react-router-dom';
import './SideBarNav.scss';

const sideBarNavItems = [
    {
        display: 'History',
        to: '/user/history',
    },
    {
        display: 'Password',
        to: '/user/password',
    },
    {
        display: 'Wishlist',
        to: '/user/wishlist',
    },
];

const SideBarNav = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-menu'>
                <div className='sidebar-menu-indicator'>
                    {sideBarNavItems.map((item, index) => (
                        <Link
                            to={item.to}
                            key={index}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className='sidebar-menu-item'>
                                <div className='sidebar-menu-item-text'>
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBarNav;
