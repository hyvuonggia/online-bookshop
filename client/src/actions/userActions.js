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

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
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
        `${process.env.REACT_APP_API_URL}/users/current-user`,
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
        `${process.env.REACT_APP_API_URL}/users/current-admin`,
        config,
    );
    return response;
};
