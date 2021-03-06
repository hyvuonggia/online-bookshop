import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    addToWishlistReducer,
    getWishlistReducer,
    removeFromWishlistReducer,
    saveUserAddressReducer,
    userLoginReducer,
} from './reducers/userReducers';
import {
    createCategoryReducer,
    deleteCategoryReducer,
    getCategoriesReducer,
    getCategoryReducer,
    updateCategoryReducer,
} from './reducers/categoryReducers';
import {
    createProductReducer,
    createReviewReducer,
    deleteProductReducer,
    getProductReducer,
    getProductsByCreatedDateReducer,
    getProductsByMostRatedReducer,
    getProductsBySoldReducer,
    getProductsLimitReducer,
    getProductsReducer,
    updateProductReducer,
} from './reducers/productReducers';
import { uploadImageReducer } from './reducers/imageReducers';
import {
    applyCouponToCartReducer,
    cartReducer,
    getCartReducer,
    saveCartReducer,
} from './reducers/cartReducers';
import {
    createCouponReducer,
    deleteCouponReducer,
    getCouponsReducer,
} from './reducers/couponReducers';
import {
    createCashOrderReducer,
    creatOrderReducer,
} from './reducers/orderReducers';
import {
    getOrdersReducer,
    setOrderStatusReducer,
} from './reducers/adminReducers';
import { cashOnDeliveryReducer } from './reducers/codReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    getCategories: getCategoriesReducer,
    getCategory: getCategoryReducer,
    createCategory: createCategoryReducer,
    updateCategory: updateCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    createProduct: createProductReducer,
    uploadImage: uploadImageReducer,
    getProductsLimit: getProductsLimitReducer,
    deleteProduct: deleteProductReducer,
    getProduct: getProductReducer,
    getProducts: getProductsReducer,
    updateProduct: updateProductReducer,
    getProductsByCreatedDate: getProductsByCreatedDateReducer,
    getProductsBySold: getProductsBySoldReducer,
    getProductsMostRated: getProductsByMostRatedReducer,
    createReview: createReviewReducer,
    cart: cartReducer,
    saveCart: saveCartReducer,
    getCart: getCartReducer,
    saveUserAddress: saveUserAddressReducer,
    addToWishlist: addToWishlistReducer,
    getWishlist: getWishlistReducer,
    removeFromWishlist: removeFromWishlistReducer,
    createCoupon: createCouponReducer,
    getCoupons: getCouponsReducer,
    deleteCoupon: deleteCouponReducer,
    applyCouponToCart: applyCouponToCartReducer,
    createOrder: creatOrderReducer,
    createCashOrder: createCashOrderReducer,
    getOrders: getOrdersReducer,
    setOrderStatus: setOrderStatusReducer,
    cashOnDelivery: cashOnDeliveryReducer,
});

const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const initialState = { cart: { cartItems: cartItemsFromStorage } };

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
