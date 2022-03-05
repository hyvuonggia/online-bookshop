import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    GET_PRODUCTS_LIMIT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
} from '../constants/productConstants';

export const createProductReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_PRODUCT_SUCCESS:
            return {
                product: payload,
                success: true,
            };
        case CREATE_PRODUCT_FAIL:
            return {
                error: payload,
            };
        case CREATE_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};

export const getProductsLimitReducer = (state = { products: [] }, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS_LIMIT_SUCCESS:
            return {
                products: payload,
            };
        default:
            return state;
    }
};

export const deleteProductReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case DELETE_PRODUCT_SUCCESS:
            return {
                success: true,
                product: payload,
            };
        case DELETE_PRODUCT_FAIL:
            return {
                success: false,
                error: payload,
            };
        case DELETE_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};

export const getProductReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCT_SUCCESS:
            return {
                success: true,
                product: payload,
            };
        case GET_PRODUCT_FAIL:
            return {
                success: false,
                error: payload,
            };
        default:
            return state;
    }
};
