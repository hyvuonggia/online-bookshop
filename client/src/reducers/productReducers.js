import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,
    CREATE_PRODUCT_SUCCESS,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_RESET,
    CREATE_REVIEW_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    GET_PRODUCTS_BY_CREATED_DATE_SUCCESS,
    GET_PRODUCTS_BY_MOST_RATED_SUCCESS,
    GET_PRODUCTS_BY_SOLD_SUCCESS,
    GET_PRODUCTS_LIMIT_SUCCESS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
} from '../constants/productConstants.js';

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

export const getProductsReducer = (state = { products: [] }, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS_SUCCESS:
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

export const updateProductReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_PRODUCT_SUCCESS:
            return {
                success: true,
            };
        case UPDATE_PRODUCT_FAIL:
            return {
                success: false,
                error: payload,
            };
        case UPDATE_PRODUCT_RESET:
            return {};
        default:
            return state;
    }
};

export const getProductsByCreatedDateReducer = (
    state = { products: [] },
    action,
) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS_BY_CREATED_DATE_SUCCESS:
            return {
                success: true,
                products: payload,
            };

        default:
            return state;
    }
};

export const getProductsBySoldReducer = (state = { products: [] }, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS_BY_SOLD_SUCCESS:
            return {
                success: true,
                products: payload,
            };

        default:
            return state;
    }
};

export const getProductsByMostRatedReducer = (
    state = { products: [] },
    action,
) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS_BY_MOST_RATED_SUCCESS:
            return {
                success: true,
                products: payload,
            };

        default:
            return state;
    }
};

export const createReviewReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_REVIEW_SUCCESS:
            return {
                success: true,
            };
        case CREATE_REVIEW_FAIL:
            return {
                success: false,
                error: payload,
            };
        case CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};
