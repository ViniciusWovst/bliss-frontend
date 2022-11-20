import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HeathCheck from '../pages/HeathCheck';

const RouteList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HeathCheck />} />
    </Routes>
  );
};

export default RouteList;
