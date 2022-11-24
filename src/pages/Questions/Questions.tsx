import React from 'react';
import {
  useFetchQuestions,
  QUESTION_LIMIT,
  QUESTION_OFFSET,
} from '../../queries/useQuestionsQuery';
import styled from 'styled-components';
import Toolbar from '../../components/Toolbar';

import QuestionSearch from './QuestionSearch';
import {useNavigate} from 'react-router-dom';

const Container = styled.div`
  padding-top: 60px;
  padding-bottom: 30px;
`;
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 30px 16px;
`;
const QuestionItem = styled.div`
  background-color: white;
  border-radius: 6px;
  border: 1px solid;
  border-color: lightgray;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  margin: 0 30px;
  &:hover {
    background-color: #e8e8e8;
    border-color: var(--primary);
  }
`;

const PublishedAt = styled.div`
  font-size: 12px;
  color: gray;
`;

const Questions: React.FC = () => {
  const {data: QuestionsData} = useFetchQuestions(
    QUESTION_LIMIT,
    QUESTION_OFFSET,
    '',
  );
  const urlQueryParams = new URLSearchParams(window.location.search);

  const filter = urlQueryParams.get('filter') || '';

  const navigate = useNavigate();

  return (
    <Container>
      <Toolbar>
        <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
          Questions
          <QuestionSearch value={filter} data-testid="questionSearchInput" />
        </div>
      </Toolbar>
      <QuestionContainer>
        {QuestionsData?.map((question, index) => (
          <QuestionItem
            key={index}
            data-testid={`questionItem-${index}`}
            onClick={() => navigate(`/questions/${question.id}`)}
          >
            <img src={question.thumb_url} width={90} height={90} />

            <div>
              {question.question}
              <PublishedAt>Published at {question.published_at}</PublishedAt>
            </div>
          </QuestionItem>
        ))}
      </QuestionContainer>
    </Container>
  );
};

export default Questions;
