import React from 'react';
import { Form } from 'react-bootstrap';

const FileUpload = () => {
    const fileUpload = (e) => {
        let file = e.target.files[0];
        console.log(file);
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
