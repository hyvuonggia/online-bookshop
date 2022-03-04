import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Resizer from 'react-image-file-resizer';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../actions/imageActions';

const FileUpload = ({ product, setProduct, setLoading }) => {
    const dispatch = useDispatch();

    const { image } = useSelector((state) => state.uploadImage);

    useEffect(() => {
        if (image) {
            setProduct({
                ...product,
                image: image.data,
            });
            console.log(image.data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ image]);

    const fileUpload = (e) => {
        setLoading(true)
        let file = e.target.files[0];
        if (file) {
            Resizer.imageFileResizer(
                file,
                720,
                720,
                'JPEG',
                100,    
                0,
                (uri) => {       
                    dispatch(uploadImage(uri));
                },
                'base64',
            );
        }
        setLoading(false)
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
