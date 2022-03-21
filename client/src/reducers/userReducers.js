import {
    ADD_TO_WISHLIST_FAIL,
    ADD_TO_WISHLIST_SUCCESS,
    GET_WISHLIST_FAIL,
    GET_WISHLIST_SUCCESS,
    LOGGED_IN_USER,
    LOGOUT,
    REMOVE_FROM_WISHLIST_FAIL,
    REMOVE_FROM_WISHLIST_SUCCESS,
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

export const addToWishlistReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_TO_WISHLIST_SUCCESS:
            return {
                success: true,
                message: payload,
            };
        case ADD_TO_WISHLIST_FAIL:
            return {
                success: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const getWishlistReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_WISHLIST_SUCCESS:
            return {
                success: true,
                wishlist: payload,
            };
        case GET_WISHLIST_FAIL:
            return {
                success: false,
                error: 'Get wishlist failed',
            };
        default:
            return state;
    }
};

export const removeFromWishlistReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case REMOVE_FROM_WISHLIST_SUCCESS:
            return {
                success: true,
            };
        case REMOVE_FROM_WISHLIST_FAIL:
            return {
                success: false,
                error: payload,
            };
        default:
            return state;
    }
};
