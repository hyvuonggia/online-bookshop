import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../actions/categoryActions';
import { GET_CATEGORY_RESET } from '../constants/categoryConstants';

const CategoryUpdate = () => {
    const navigate = useNavigate();
    const match = useParams();
    const dispatch = useDispatch();

    const [name, setName] = useState('');

    // const { category } = useSelector((state) => state.getCategory);

    useEffect(() => {
        dispatch(getCategory(match.slug)).then((c) => setName(c.data.name));
    }, [dispatch, match.slug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCategory(match.slug, { name }))
            .then((res) => {
                toast.success(`"${res.data.name}" updated`);
                dispatch({
                    type: GET_CATEGORY_RESET,
                });
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
                <Button
                    type='submit'
                    variant='dark'
                    disabled={!name}
                    className='mt-3'
                >
                    Submit
                </Button>
            </Form>
        </Fragment>
    );
};

export default CategoryUpdate;
