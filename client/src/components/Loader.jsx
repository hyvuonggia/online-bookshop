import React, { Fragment } from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        // <Fragment>
        //     {/* <div
        //         style={{
        //             position: 'fixed',
        //             width: '100%',
        //             height: '100%',
        //             background: 'rgba(0,0,0,0.2)',
        //         }}
        //     ></div> */}

        // </Fragment>
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
