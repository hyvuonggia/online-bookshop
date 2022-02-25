import axios from 'axios';
import {
    CREATE_CATEGORY_FAIL,
    CREATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS,
} from '../constants/categoryConstant';

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get(
            'http://localhost:5000/api/categories',
        );
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getCategory = (slug) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/categories/${slug}`,
        );
        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_CATEGORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createCategory = (category) => async (dispatch, getState) => {
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
            'http://localhost:5000/api/categories',
            category,
            config,
        );
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateCategory = (category) => async (dispatch, getState) => {
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
            `http://localhost:5000/api/categories/${category.slug}`,
            category,
            config,
        );
        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteCategory = (category) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        await axios.delete(
            `http://localhost:5000/api/categories/${category.slug}`,
            config,
        );
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
