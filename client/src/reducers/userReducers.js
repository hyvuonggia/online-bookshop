import { LOGGED_IN_USER, LOGOUT } from '../constants/userConstants';

export const userLoginReducer = (state = { user: {} }, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGGED_IN_USER:
            return {
                ...state,
                user: payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: {},
            };
        default:
            return state;
    }
};
