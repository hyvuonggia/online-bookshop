import axios from 'axios';
import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_SUCCESS,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    GET_PRODUCTS_BY_CREATED_DATE_SUCCESS,
    GET_PRODUCTS_BY_MOST_RATED_SUCCESS,
    GET_PRODUCTS_BY_SOLD_SUCCESS,
    // GET_PRODUCTS_LIMIT_SUCCESS,
    GET_PRODUCTS_SUCCESS,
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

        const response = await axios.post(`/api/products`, product, config);
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

// export const getProductsLimit = (limit) => async (dispatch) => {
//     const response = await axios.get(
//         `/api/products/limit/${limit}`,
//     );
//     dispatch({
//         type: GET_PRODUCTS_LIMIT_SUCCESS,
//         payload: response.data,
//     });
// };

export const getProducts =
    (sort = 'title', order = 'asc') =>
    async (dispatch) => {
        const response = await axios.get(
            `/api/products?sort=${sort}&order=${order}`,
        );
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
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
        const response = await axios.delete(`/api/products/${slug}`, config);
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
        const response = await axios.get(`/api/products/${slug}`);
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
            `/api/products/${slug}`,
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

export const getProductsByCreatedDate = (limit) => async (dispatch) => {
    const response = await axios.post(`/api/products/new-arrivals`, { limit });
    dispatch({
        type: GET_PRODUCTS_BY_CREATED_DATE_SUCCESS,
        payload: response.data,
    });
};

export const getProductsBySold = (limit) => async (dispatch) => {
    const response = await axios.post(`/api/products/best-sellers`, { limit });
    dispatch({
        type: GET_PRODUCTS_BY_SOLD_SUCCESS,
        payload: response.data,
    });
};

export const getProductsByMostRated = (limit) => async (dispatch) => {
    const response = await axios.post(`/api/products/most-rated`, { limit });
    dispatch({
        type: GET_PRODUCTS_BY_MOST_RATED_SUCCESS,
        payload: response.data,
    });
};

export const createReview = (slug, review) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };
        await axios.post(`/api/products/${slug}/reviews`, review, config);

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
