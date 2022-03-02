import axios from 'axios';
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Resizer from 'react-image-file-resizer';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../actions/imageActions';

const FileUpload = ({ product, setProduct }) => {
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
    }, [ image]);

    const fileUpload = (e) => {
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
                    // TODO: Refactor to redux state and add authCheck, adminCheck
                    // axios
                    //     .post('http://localhost:5000/api/cloudinary/upload', {
                    //         image: uri,
                    //     })
                    //     .then((res) => {
                    //         console.log('IMAGE UPLOAD RES DATA', res);
                    //         setProduct({
                    //             ...product,
                    //             image: res.data,
                    //         });
                    //     })
                    //     .catch((err) => {
                    //         console.log('CLOUDINARY UPLOAD ERR', err);
                    //     });
                    dispatch(uploadImage(uri));
                },
                'base64',
            );
        }
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
