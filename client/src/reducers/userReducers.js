import {
    LOGGED_IN_USER,
    LOGOUT,
    SAVE_USER_ADDRESS_FAIL,
    SAVE_USER_ADDRESS_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGGED_IN_USER:
            return {
                ...state,
                user: payload,
            };
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export const saveUserAddressReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case SAVE_USER_ADDRESS_SUCCESS:
            return {
                success: true,
                address: payload,
            };
        case SAVE_USER_ADDRESS_FAIL:
            return {
                success: false,
                error: payload,
            };
        default:
            return state;
    }
};
