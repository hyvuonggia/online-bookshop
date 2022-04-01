import React from 'react';
import '../css/Footer.scss';

const Footer = () => {
    return (
        <footer className='footer-distributed '>
            <div className='footer-left'>
                <h3>
                    <img src='/logo.svg' width='40' height='40' alt='logo' />
                    Bookshop
                </h3>

                <p className='footer-company-name'>Bookshop © 2022</p>
            </div>

            <div className='footer-center'>
                <div>
                    <i className='fa fa-map-marker'></i>
                    <p>
                        <span>22/6, Bem ter</span> Debrecen, Hungary
                    </p>
                </div>

                <div>
                    <i className='fa fa-phone'></i>
                    <p>+36 70 542 9668</p>
                </div>

                <div>
                    <i className='fa fa-envelope'></i>
                    <p>
                        <a href='mailto:hyvuonggia@gmail.com'>
                            hyvuonggia@gmail.com
                        </a>
                    </p>
                </div>
            </div>

            <div className='footer-right'>
                <p className='footer-company-about'>
                    <span>About us</span>
                    Lorem ipsum dolor sit amet, consectateur adispicing elit.
                    Fusce euismod convallis velit, eu auctor lacus vehicula sit
                    amet.
                </p>

                <div className='footer-icons'>
                    <a
                        href='https://www.facebook.com/vugihy/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <i className='fa-brands fa-facebook-square'></i>
                    </a>
                    <a
                        href='https://www.linkedin.com/in/gia-hy-vuong-14a63a1a5/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <i className='fa-brands fa-linkedin'></i>
                    </a>
                    <a
                        href='https://github.com/hyvuonggia'
                        target='_blank'
                        rel='noreferrer'
                    >
                        <i className='fa-brands fa-github-square'></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
