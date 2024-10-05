import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Tariffs from '../components/Traffics/Tariffs';
import MainPage from '../pages/MainPage/MainPage';
import Login from '../pages/LoginPage/LoginPage';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Registration />} /> */}
            <Route path='/tariffs' element={<Tariffs />} />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
};

export default Routers