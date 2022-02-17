import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RegisterComplete from './pages/RegisterComplete';

function App() {
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
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
