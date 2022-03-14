import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './reducers/userReducers';
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
});

const middleware = [thunk];
const initialState = {};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
