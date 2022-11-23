import React from 'react';
import {Route, Routes} from 'react-router-dom';
import HealthCheck from '../pages/HealthCheck';
import Questions from '../pages/Questions';
import Question from '../pages/Question';
import NoConnection from '../pages/NoConnection';

import {useOnlineStatus} from '../context/OnlineStatusContext';

const RouteList: React.FC = () => {
  const isOnline = useOnlineStatus();
  console.log('isOnline ', isOnline);
  if (!isOnline) {
    return <NoConnection />;
  }
  return (
    <Routes>
      <Route path="/" element={<HealthCheck />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/questions/:questionId" element={<Question />} />
    </Routes>
  );
};

export default RouteList;
