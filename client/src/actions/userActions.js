import { signOut } from 'firebase/auth';
import { LOGOUT } from '../constants/userConstants';
import { auth } from '../firebase';
import axios from 'axios';

export const logout = () => (dispatch) => {
    signOut(auth)
        .then(() => {
            dispatch({
                type: LOGOUT,
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const createUser = (authtoken) => async (dispatch) => {
    const response = await axios.post(
        'http://localhost:5000/api/users',
        {},
        {
            headers: {
                authtoken,
            },
        },
    );
    return response;
};

export const getCurrentUser = (authtoken) => async (dispatch) => {
    const response = await axios.get(
        'http://localhost:5000/api/users/current-user',
        {
            headers: {
                authtoken,
            },
        },
    );
    return response;
};
