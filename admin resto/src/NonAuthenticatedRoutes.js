// NonAuthenticatedRoutes.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Composent/Login';

const NonAuthenticatedRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    {/* Add more non-authenticated routes as needed */}
  </Routes>
);

export default NonAuthenticatedRoutes;
