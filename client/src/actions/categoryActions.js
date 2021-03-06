import axios from 'axios';
// import dotenv from 'dotenv'
import {
    CREATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS,
} from '../constants/categoryConstants';

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get(
            `/api/categories`,
        );
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: error.response.data,
        });
    }
};

export const getCategory = (slug) => async (dispatch) => {
    try {
        const response = await axios.get(
            `/api/categories/${slug}`,
        );
        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: response.data,
        });

        return response;
    } catch (error) {
        dispatch({
            type: GET_CATEGORY_FAIL,
            payload: error.response.data,
        });
    }
};

export const createCategory = (name) => async (dispatch, getState) => {
    const {
        userLogin: { user },
    } = getState();

    const config = {
        headers: {
            Authorization: user.token.token,
        },
    };

    const response = await axios.post(
        `/api/categories`,
        { name },
        config,
    );

    dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: response.data,
    });

    return response;
};

export const updateCategory =
    (slug, category) => async (dispatch, getState) => {
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
                `/api/categories/${slug}`,
                category,
                config,
            );
            dispatch({
                type: UPDATE_CATEGORY_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (error) {
            dispatch({
                type: UPDATE_CATEGORY_FAIL,
                payload: error.response.data,
            });
        }
    };

export const deleteCategory = (slug) => async (dispatch, getState) => {
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
            `/api/categories/${slug}`,
            config,
        );
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
        });
        return response;
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data,
        });
    }
};
