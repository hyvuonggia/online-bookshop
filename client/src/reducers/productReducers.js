import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,
    CREATE_PRODUCT_SUCCESS,
    GET_PRODUCTS_LIMIT_SUCCESS,
    UPLOAD_IMAGE_SUCCESS,
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
