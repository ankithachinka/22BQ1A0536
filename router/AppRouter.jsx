import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import StatsPage from '../pages/StatsPage';
import RedirectPage from '../pages/RedirectPage';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/stats" element={<StatsPage />} />
    <Route path="/:shortcode" element={<RedirectPage />} />
  </Routes>
);

export default AppRouter;
