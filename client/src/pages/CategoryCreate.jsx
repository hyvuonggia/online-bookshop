import React, { Fragment, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getCategories } from '../actions/categoryActions';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CategoryCreate = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    // const [categories, setCategories] = useState([]);

    const { categories } = useSelector((state) => state.getCategories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategory(name))
            .then((res) => {
                setName('');
                console.log('=========================>>>>', res);
                toast.success(`"${res.data.name}" created`);
            })
            .catch((error) => {
                // toast.error(error.response.data)
                setName('');
                if (error.response.status === 400) {
                    toast.error(error.response.data);
                }
            });
    };

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>New Category</Form.Label>
                    <Form.Control
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
            {JSON.stringify(categories)}
        </Fragment>
    );
};

export default CategoryCreate;
