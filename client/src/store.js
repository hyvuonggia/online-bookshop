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
import { createProductReducer } from './reducers/productReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    getCategories: getCategoriesReducer,
    getCategory: getCategoryReducer,
    createCategory: createCategoryReducer,
    updateCategory: updateCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    createProduct: createProductReducer,
});

const middleware = [thunk];
const initialState = {};

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
