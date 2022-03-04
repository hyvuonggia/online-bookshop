import axios from 'axios';
import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_SUCCESS,
    GET_PRODUCTS_LIMIT_SUCCESS,
} from '../constants/productConstants';

export const createProduct = (product) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        const response = await axios.post(
            'http://localhost:5000/api/products',
            product,
            config,
        );
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: response.data,
        });
        return response;
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response.data,
        });
    }
};

export const getProductsLimit = (limit) => async (dispatch) => {
    const response = await axios.get(
        `http://localhost:5000/api/products/${limit}`,
    );
    dispatch({
        type: GET_PRODUCTS_LIMIT_SUCCESS,
        payload: response.data,
    });
};
