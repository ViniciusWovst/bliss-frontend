import React, {useEffect} from 'react';
import {useHealthCheck} from '../../queries/useHealthCheckQuery';
import styled from 'styled-components';
import Button from '../../components/Button';
import {useNavigate} from 'react-router-dom';

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
const HealthCheck: React.FC = () => {
  const {data: healthIsOk, isFetching, refetch} = useHealthCheck();

  const navigate = useNavigate();

  useEffect(() => {
    if (healthIsOk) navigate('/questions');
  }, [healthIsOk]);

  return (
    <Container>
      {isFetching && (
        <LoadingContainer>
          <p>Checking...</p>
        </LoadingContainer>
      )}

      {healthIsOk === false && (
        <SomethingWrong>
          Something wrong. Please try again later.
          <RetryButtonContainer>
            <RetryButton data-testid="retryButton" onClick={() => refetch()}>
              Retry
            </RetryButton>
          </RetryButtonContainer>
        </SomethingWrong>
      )}
    </Container>
  );
};

export default HealthCheck;
