import {
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_RESET,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS,
} from '../constants/categoryConstants';

export const getCategoriesReducer = (state = { categories: [] }, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
            };
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};

export const getCategoryReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: payload,
            };
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
            };
        case GET_CATEGORY_RESET:
            return {};
        default:
            return state;
    }
};

export const createCategoryReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: payload,
            };
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};

export const updateCategoryReducer = (state = { category: {} }, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                category: payload,
            };
        case UPDATE_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};

export const deleteCategoryReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                success: true,
            };
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};
