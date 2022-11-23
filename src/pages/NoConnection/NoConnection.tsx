import React from 'react';
import styled from 'styled-components';
import {MdWifiOff} from 'react-icons/md';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StatusContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  border: 1px solid red;
  padding: 32px;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: padding 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  :hover {
    border: 2px solid red;
    padding: 42px;
  }
`;

const NoConnection: React.FC = () => {
  return (
    <Container>
      <StatusContainer>
        <MdWifiOff size={26} /> Ooops... No internet connection.
      </StatusContainer>
    </Container>
  );
};

export default NoConnection;
