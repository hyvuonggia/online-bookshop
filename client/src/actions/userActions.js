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

export const createUser = (authtoken) => async () => {
    const config = {
        headers: {
            Authorization: authtoken,
        },
    };

    const response = await axios.post(
        'http://localhost:5000/api/users',
        {},
        config,
    );
    return response;
};

export const getCurrentUser = (authtoken) => async () => {
    const config = {
        headers: {
            Authorization: authtoken,
        },
    };

    const response = await axios.get(
        'http://localhost:5000/api/users/current-user',
        config,
    );
    return response;
};

export const getCurrentAdmin = async (authtoken) => {
    const config = {
        headers: {
            Authorization: authtoken,
        },
    };

    const response = await axios.get(
        'http://localhost:5000/api/users/current-admin',
        config,
    );
    return response;
};
