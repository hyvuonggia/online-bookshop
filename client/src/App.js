import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import RegisterComplete from './pages/RegisterComplete';

function App() {
    return (
        <Fragment>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path='/register/complete' element={<RegisterComplete />} /> */}
            </Routes>
        </Fragment>
    );
}

export default App;
