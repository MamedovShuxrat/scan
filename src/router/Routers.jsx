import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Tariffs from '../components/Traffics/Tariffs';
import MainPage from '../pages/MainPage/MainPage';
import Login from '../pages/LoginPage/LoginPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import OutputPage from '../pages/OutputPage/OutputPage';
import ProtectedRoute from '../components/utils/ProtectedRoute';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<ProtectedRoute element={SearchPage} />} />
            <Route path="/output" element={<ProtectedRoute element={OutputPage} />} />
            {/* <Route path="/output" element={<OutputPage />} /> */}
            <Route path='/tariffs' element={<Tariffs />} />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
};

export default Routers