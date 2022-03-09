import React, { Fragment, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCategory,
    deleteCategory,
    getCategories,
} from '../actions/categoryActions';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryCreate = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [keyword, setKeyword] = useState('');

    const { categories } = useSelector((state) => state.getCategories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategory(name))
            .then((res) => {
                setName('');
                toast.success(`"${res.data.name}" created`);
                dispatch(getCategories());
            })
            .catch((error) => {
                setName('');
                if (error.response.status === 400) {
                    toast.error(error.response.data);
                }
            });
    };

    const handleDelete = (slug) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteCategory(slug))
                .then((res) => {
                    console.log(res);
                    setName('');
                    toast.success(`Deleted successful`);
                    dispatch(getCategories());
                })
                .catch((error) => {
                    setName('');
                    if (error.response.status === 400) {
                        toast.error(error.response.data);
                    }
                });
        }
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value.toLowerCase());
    };

    const searchedKeyword = (keyword) => (c) =>
        c.name.toLowerCase().includes(keyword);

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
                <Button type='submit' variant='dark'>
                    Submit
                </Button>
            </Form>
            {/* {JSON.stringify(categories)} */}
            <br></br>
            <input
                placeholder='Search category'
                style={{ width: '20%' }}
                className='mb-3'
                value={keyword}
                onChange={handleKeywordChange}
            />
            <Table
                striped
                bordered
                responsive
                className='table-sm'
                style={{ width: '700px' }}
                size='sm'
            >
                <tbody>
                    {categories
                        .filter(searchedKeyword(keyword))
                        .map((category) => (
                            <tr key={category._id}>
                                <td width='100%'>{category.name}</td>
                                {/* <td>
                                    <Link
                                        to={`/admin/category/${category.slug}`}
                                    >
                                        <Button variant='dark'>
                                            <i className='fas fa-pencil' />
                                        </Button>
                                    </Link>
                                </td> */}
                                <td>
                                    <Button
                                        variant='danger'
                                        onClick={() =>
                                            handleDelete(category.slug)
                                        }
                                    >
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Fragment>
    );
};

export default CategoryCreate;
