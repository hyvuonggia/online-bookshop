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
import ProtectedRoute from './components/ProtectedRoute';
import UserHistory from './pages/UserHistory';

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
            <main className='py-3'>
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
                        <Route path='/user/history' element={<UserHistory />} />
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
