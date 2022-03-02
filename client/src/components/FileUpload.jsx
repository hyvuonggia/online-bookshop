import React from 'react';
import { Form } from 'react-bootstrap';

const FileUpload = () => {
    const fileUpload = (e) => {
        console.log(e.target.files);
    };
    return (
        <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
                type='file'
                name='image'
                accept='image/*'
                onChange={fileUpload}
            />
        </Form.Group>
    );
};

export default FileUpload;
