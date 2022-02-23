import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingRedirect = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        // redirect
        count === 0 && navigate('/');
        
        // cleanup
        return () => clearInterval(interval);
    }, [count, navigate]);
    return (
        <div className='container p-5 text-center'>
            <p>Redirecting you in {count} seconds</p>
        </div>
    );
};

export default LoadingRedirect;
