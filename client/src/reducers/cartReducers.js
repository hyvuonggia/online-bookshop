import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
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
