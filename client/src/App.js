import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RegisterComplete from './pages/RegisterComplete';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getIdTokenResult, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { LOGGED_IN_USER } from './constants/userConstants';
import ForgotPassword from './pages/ForgotPassword';
import { getCurrentUser } from './actions/userActions';
import ProtectedRoute from './components/route/ProtectedRoute';
import UserHistory from './pages/UserHistory';
import AppLayout from './components/layout/AppLayout';
import PasswordUpdate from './pages/PasswordUpdate';
import Wishlist from './pages/Wishlist';
import AdminRoute from './components/route/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import CategoryCreate from './pages/CategoryCreate';
import CategoryUpdate from './pages/CategoryUpdate';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idTokenResult = await getIdTokenResult(user);
                // console.log('user', user);
                dispatch(getCurrentUser(idTokenResult.token)).then((res) =>
                    dispatch({
                        type: LOGGED_IN_USER,
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult,
                            role: res.data.role,
                            _id: res.data._id,
                        },
                    }),
                );
            }
        });

        return unsubscribe;
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header />
            <main>
                <ToastContainer />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route
                        path='/register/complete'
                        element={<RegisterComplete />}
                    />
                    <Route
                        path='/forgot/password'
                        element={<ForgotPassword />}
                    />
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AppLayout />}>
                            <Route
                                path='/user/history'
                                element={<UserHistory />}
                            />
                            <Route
                                path='/user/password'
                                element={<PasswordUpdate />}
                            />
                            <Route
                                path='/user/wishlist'
                                element={<Wishlist />}
                            />
                        </Route>
                    </Route>
                    <Route element={<AdminRoute />}>
                        <Route element={<AppLayout />}>
                            <Route
                                path='/admin/dashboard'
                                element={<AdminDashboard />}
                            />
                            <Route
                                path='/admin/category'
                                element={<CategoryCreate />}
                            />
                            <Route
                                path='/admin/category/:slug'
                                element={<CategoryUpdate />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
