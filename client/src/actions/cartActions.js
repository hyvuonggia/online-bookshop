import axios from 'axios';
import {
    APPLY_COUPON_TO_CART_FAIL,
    APPLY_COUPON_TO_CART_SUCCESS,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    GET_CART_FAIL,
    GET_CART_SUCCESS,
    SAVE_CART_FAIL,
    SAVE_CART_SUCCESS,
} from '../constants/cartConstants';

export const addToCart = (slug) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${slug}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            slug: data.slug,
            title: data.title,
            image: data.image.url,
            price: data.price,
            author: data.author,
            category: data.category.name,
        },
    });

    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems),
    );
};

export const removeFromCart = (slug) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: slug,
    });

    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems),
    );
};

export const userCart = (cart) => async (dispatch, getState) => {
    try {
        console.log('cart', cart);
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        const response = await axios.post(`/api/cart`, { cart }, config);

        dispatch({
            type: SAVE_CART_SUCCESS,
            payload: response.data,
        });
        return response;
    } catch (error) {
        dispatch({
            type: SAVE_CART_FAIL,
            payload: error.response.data,
        });
        // console.log(error);
    }
};

export const getCart = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        const response = await axios.get(`/api/cart`, config);

        dispatch({
            type: GET_CART_SUCCESS,
            payload: response.data,
        });
        return response;
    } catch (error) {
        dispatch({
            type: GET_CART_FAIL,
            payload: error.response.data,
        });
    }
};

export const applyCouponToCart = (coupon) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { user },
        } = getState();

        const config = {
            headers: {
                Authorization: user.token.token,
            },
        };

        const response = await axios.post(
            `/api/cart/coupon`,
            { coupon },
            config,
        );
        dispatch({
            type: APPLY_COUPON_TO_CART_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: APPLY_COUPON_TO_CART_FAIL,
            payload:
                error.response.status === 404
                    ? error.response.data
                    : error.message,
        });
    }
};
