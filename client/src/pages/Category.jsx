import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory } from '../actions/categoryActions';
import Loader from '../components/Loader';
import { GET_CATEGORY_RESET } from '../constants/categoryConstants';

const Category = () => {
    const match = useParams();
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.getCategory);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        dispatch({
            type: GET_CATEGORY_RESET,
        });
        setLoading(true);
        dispatch(getCategory(match.slug)).then(() => setLoading(false));
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? <Loader /> : <div>{JSON.stringify(category)}</div>;
};

export default Category;
