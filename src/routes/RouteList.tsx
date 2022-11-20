import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HealthCheck from '../pages/HealthCheck';

const RouteList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HealthCheck />} />
    </Routes>
  );
};

export default RouteList;
