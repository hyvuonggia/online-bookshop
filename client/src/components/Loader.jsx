import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner
            variant='primary'
            animation='border'
            role='status'
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display: 'block',
                position: 'fixed',
            }}
        />
    );
};

export default Loader;
