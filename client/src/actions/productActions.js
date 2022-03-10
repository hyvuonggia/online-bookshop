import axios from 'axios';
import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_SUCCESS,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    GET_PRODUCTS_BY_CREATED_DATE_SUCCESS,
    GET_PRODUCTS_BY_SOLD_SUCCESS,
    GET_PRODUCTS_LIMIT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
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
            `${process.env.REACT_APP_API_URL}/products`,
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
        `${process.env.REACT_APP_API_URL}/products/limit/${limit}`,
    );
    dispatch({
        type: GET_PRODUCTS_LIMIT_SUCCESS,
        payload: response.data,
    });
};

export const deleteProduct = (slug) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/products/${slug}`,
            config,
        );
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data,
        });
    }
};

export const getProduct = (slug) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/products/${slug}`,
        );
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: error.response.data,
        });
    }
};

export const updateProduct = (slug, product) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}/products/${slug}`,
            product,
            config,
        );
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data,
        });
    }
};

export const getProductsByCreatedDate = () => async (dispatch) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/new-arrivals`,
    );
    dispatch({
        type: GET_PRODUCTS_BY_CREATED_DATE_SUCCESS,
        payload: response.data,
    });
};

export const getProductsBySold = () => async (dispatch) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/best-sellers`,
    );
    dispatch({
        type: GET_PRODUCTS_BY_SOLD_SUCCESS,
        payload: response.data,
    });
};

export const createReview = (slug, review) => async (dispatch, getState) => {
    console.log('==============================>review', review);
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };
        await axios.post(
            `${process.env.REACT_APP_API_URL}/products/${slug}/reviews`,
            review,
            config,
        );

        dispatch({
            type: CREATE_REVIEW_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload: error.response.data,
        });
        // console.log(error.response.data);
    }
};
