import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../actions/categoryActions';

const CategoryUpdate = () => {
    const navigate = useNavigate();
    const match = useParams();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const { category } = useSelector((state) => state.getCategory);
    useEffect(() => {
        dispatch(getCategory(match.slug));
        setName(category.name);
    }, [category, dispatch, match.slug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCategory(match.slug, { name }))
            .then((res) => {
                setName('');
                toast.success(`"${res.data.name}" updated`);
                navigate('/admin/category');
            })
            .catch((error) => {
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
                    <Form.Label>Update Category</Form.Label>
                    <Form.Control
                        type='text'
                        value={name || ''}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>
        </Fragment>
    );
};

export default CategoryUpdate;
