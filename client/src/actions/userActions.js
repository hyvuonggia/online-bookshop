import { signOut } from 'firebase/auth';
import {
    LOGOUT,
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
