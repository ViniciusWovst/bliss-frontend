import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HealthCheck from '../pages/HealthCheck';
import Questions from '../pages/Questions';
import Question from '../pages/Question';

const RouteList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HealthCheck />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/questions/:questionId" element={<Question />} />
    </Routes>
  );
};

export default RouteList;
