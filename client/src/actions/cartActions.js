import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

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
