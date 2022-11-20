import React from 'react';
import {useHeathCheck} from '../../queries/useHeathCheckQuery';
import styled from 'styled-components';
import Button from '../../components/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SomethingWrong = styled.div`
  background-color: white;
  border-radius: 6px;
  border: 1px solid lightgray;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RetryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RetryButton = styled(Button)`
  background-color: #dad9d9;
`;

const LoadingContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  border: 1px solid lightgray;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const HeathCheck: React.FC = () => {
  const {data: heathIsOk, isFetching, refetch} = useHeathCheck();

  return (
    <Container>
      {isFetching && (
        <LoadingContainer>
          <p>Checking...</p>
        </LoadingContainer>
      )}

      {heathIsOk === false && (
        <SomethingWrong>
          Something wrong. Please try again later.
          <RetryButtonContainer>
            <RetryButton onClick={() => refetch()}>Retry</RetryButton>
          </RetryButtonContainer>
        </SomethingWrong>
      )}
    </Container>
  );
};

export default HeathCheck;
