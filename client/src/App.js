import { Fragment } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Fragment>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Fragment>
    );
}

export default App;
