import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, removeFromWishlist } from '../actions/userActions';
import Loader from '../components/Loader';

const Wishlist = () => {
    const dispatch = useDispatch();

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    const { wishlist: wishlistGet } = useSelector((state) => state.getWishlist);

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    useEffect(() => {
        setLoading(true);
        if (wishlistGet) {
            setWishlist(wishlistGet);
            setLoading(false);
        } else {
            dispatch(getWishlist());
        }
    }, [dispatch, wishlistGet]);

    const handleRemoveFromWishlist = (slug) => {
        dispatch(removeFromWishlist(slug)).then(() => {
            dispatch(getWishlist());
        });
    };

    return loading ? (
        <Loader />
    ) : (
        <Container>
            <h1 className='py-5'>Wishlist</h1>
            {wishlist.length === 0 ? (
                <Alert variant='warning'>Your wishlist is empty</Alert>
            ) : (
                <Table
                    striped
                    bordered
                    responsive
                    className='table-sm'
                    size='sm'
                    style={{ width: '100%' }}
                >
                    <thead>
                        <tr>
                            <th width='50%'>
                                <strong>Title</strong>
                            </th>
                            <th width='30%'>
                                <strong>Author</strong>
                            </th>
                            <th width='90%'>
                                <strong>Category</strong>
                            </th>
                            <th>
                                <strong>Price</strong>
                            </th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {wishlist.map((product) => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>{product.author}</td>
                                <td>{product.category.name}</td>
                                <td>$ {product.price}</td>
                                <td>
                                    <Button
                                        variant='danger'
                                        onClick={() =>
                                            handleRemoveFromWishlist(
                                                product.slug,
                                            )
                                        }
                                    >
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Wishlist;
