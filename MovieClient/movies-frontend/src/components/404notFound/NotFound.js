import React from 'react';
import { Button } from 'react-bootstrap';
import svg from '../../404.svg';
import './NotFound.css'

const NotFound = () => {
    const handleBackToHome = () => {
        window.location.href = '/'; // Redirect to homepage
    };

    return (
        <div className="cont404">
            <img src={svg} alt="404 Illustration" />
            <h1 style={{ color: '#fff' }}>404 - Page Not Found</h1>
            <Button onClick={handleBackToHome}>Back To Home</Button>
        </div>
    );
};

export default NotFound;
