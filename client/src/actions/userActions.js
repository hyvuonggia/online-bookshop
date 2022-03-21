import { signOut } from 'firebase/auth';
import {
    ADD_TO_WISHLIST_FAIL,
    ADD_TO_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    GET_WISHLIST_SUCCESS,
    LOGOUT,
    REMOVE_FROM_WISHLIST_FAIL,
    REMOVE_FROM_WISHLIST_SUCCESS,
    SAVE_USER_ADDRESS_FAIL,
    SAVE_USER_ADDRESS_SUCCESS,
} from '../constants/userConstants';
import { auth } from '../firebase';
import axios from 'axios';

export const logout = () => (dispatch) => {
    signOut(auth)
        .then(() => {
            dispatch({
                type: LOGOUT,
            });
            // TODO: Reset all state
        })
        .catch((error) => {
            console.log(error);
        });
};

export const createUser = (authtoken) => async () => {
    const config = {
        headers: {
            Authorization: authtoken,
        },
    };

    const response = await axios.post(`/api/users`, {}, config);
    return response;
};

export const getCurrentUser = (authtoken) => async () => {
    const config = {
        headers: {
            Authorization: authtoken,
        },
    };

    const response = await axios.get(`/api/users/current-user`, config);
    return response;
};

export const getCurrentAdmin = async (authtoken) => {
    const config = {
        headers: {
            Authorization: authtoken,
        },
    };

    const response = await axios.get(`/api/users/current-admin`, config);
    return response;
};

export const saveUserAddress = (address) => async (dispatch, getState) => {
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
            '/api/users/user/address',
            { address },
            config,
        );
        dispatch({
            type: SAVE_USER_ADDRESS_SUCCESS,
            payload: response.data.address,
        });
    } catch (error) {
        dispatch({
            type: SAVE_USER_ADDRESS_FAIL,
            payload: error.response.data,
        });
    }
};

export const getWishlist = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };
        const response = await axios.get('/api/users/user/wishlist', config);
        dispatch({
            type: GET_WISHLIST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_WISHLIST_FAIL,
            payload: error.response.data,
        });
    }
};

export const addToWishlist = (slug) => async (dispatch, getState) => {
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
            '/api/users/user/wishlist',
            { slug },
            config,
        );
        dispatch({
            type: ADD_TO_WISHLIST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ADD_TO_WISHLIST_FAIL,
        });
    }
};

export const removeFromWishlist = (slug) => async (dispatch, getState) => {
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
            `/api/users/user/wishlist`,
            {
                slug,
            },
            config,
        );
        dispatch({
            type: REMOVE_FROM_WISHLIST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: REMOVE_FROM_WISHLIST_FAIL,
            payload: error.response.data,
        });
    }
};
