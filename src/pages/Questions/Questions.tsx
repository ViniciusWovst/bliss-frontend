import React, {useState} from 'react';
import {
  useFetchQuestions,
  QUESTION_LIMIT,
  QUESTION_OFFSET,
} from '../../queries/useQuestionsQuery';
import styled from 'styled-components';
import Toolbar from '../../components/Toolbar';
import Button from '../../components/Button';
import QuestionSearch from './QuestionSearch';

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

type QuestionQueryParam = {
  limit: number;
  offset: number;
  filter: string;
};

const Questions: React.FC = () => {
  const [queryParams, setQueryParams] = useState<QuestionQueryParam>({
    limit: QUESTION_LIMIT,
    offset: QUESTION_OFFSET,
    filter: '',
  });

  const {data: QuestionsData} = useFetchQuestions(
    queryParams.limit,
    queryParams.offset,
    queryParams.filter,
  );
  const urlQueryParams = new URLSearchParams(window.location.search);

  const filter = urlQueryParams.get('filter') || '';

  return (
    <Container>
      <Toolbar>
        <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
          Questions
          <QuestionSearch value={filter} />
        </div>
      </Toolbar>
      <QuestionContainer>
        {QuestionsData?.map((question, index) => (
          <QuestionItem key={index}>
            <img src={question.thumb_url} width={90} height={90} />

            <div>
              {question.question}
              <PublishedAt>Published at {question.published_at}</PublishedAt>
            </div>
          </QuestionItem>
        ))}
      </QuestionContainer>
      <Button
        onClick={() =>
          setQueryParams((params) => {
            return {
              ...params,
              offset: params.offset + QUESTION_OFFSET,
            };
          })
        }
      >
        See more
      </Button>
    </Container>
  );
};

export default Questions;
