import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginWindow from '../components/Auth/LoginWindow';

const Routers = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to="/" />} />
            {/* <Route path="/" element={<LoginWindow />} /> */}
        </Routes>
    );
};

export default Routers