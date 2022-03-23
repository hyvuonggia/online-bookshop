import {
    APPLY_COUPON_TO_CART_FAIL,
    APPLY_COUPON_TO_CART_SUCCESS,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    GET_CART_FAIL,
    GET_CART_RESET,
    GET_CART_SUCCESS,
    SAVE_CART_FAIL,
    SAVE_CART_SUCCESS,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ADD_ITEM:
            const item = payload;

            const existItem = state.cartItems.find(
                (x) => x.product === item.product,
            );

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x,
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.slug !== action.payload,
                ),
            };
        default:
            return state;
    }
};

export const saveCartReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case SAVE_CART_SUCCESS:
            return {
                success: true,
                message: payload,
            };
        case SAVE_CART_FAIL:
            return {
                success: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const getCartReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CART_SUCCESS:
            return {
                success: true,
                cart: payload,
            };
        case GET_CART_FAIL:
            return {
                success: false,
                error: payload,
            };
        case GET_CART_RESET:
            return {};
        default:
            return state;
    }
};

export const applyCouponToCartReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case APPLY_COUPON_TO_CART_SUCCESS:
            return {
                totalAfterDiscount: payload,
            };
        case APPLY_COUPON_TO_CART_FAIL:
            return {
                error: payload,
            };

        default:
            return state;
    }
};
