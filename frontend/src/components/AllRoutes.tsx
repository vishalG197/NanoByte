import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "../pages/home";

import Feedback from "../pages/feedback"
import Dashboard from '../pages/Dashboard';
import Interview from '../pages/Interview';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/interview/:id" element={<Interview/>} />
      <Route path="/feedback" element={<Feedback/>} />
    </Routes>
  );
}

export default AllRoutes;
