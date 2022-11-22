import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import Toolbar from '../../components/Toolbar';
import {FaThumbsUp, FaArrowLeft} from 'react-icons/fa';
import Button from '../../components/Button';
import {
  getQuestion,
  Question as QuestionType,
  updateQuestion,
} from '../../api/Questions';
import ShareButton from '../../components/ShareButton';

const Container = styled.div`
  padding-top: 60px;
  padding-bottom: 30px;
`;

const Content = styled.div`
  margin: 30px 16px;
`;

const QuestionContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  gap: 8px;
`;

const ChoicesContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  padding: 16px;
  margin-top: 16px;
`;

const ChoiceTitle = styled.div`
  font-weight: bold;
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
  color: gray;
`;

const IconButton = styled(Button)`
  width: 24px;
  height: 24px;
  min-width: 0px;
  padding: 0px;
  :hover {
    background-color: #c6c6c6;
  }
`;

const BackButton = styled(Button)`
  background-color: white;
  color: black;
  width: 28px;
  height: 28px;
  min-width: 0px;
  padding: 0px;
  :hover {
    opacity: 0.8;
  }
`;

const ChoiceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 8px;
`;

type ChoiceSelected = {index: number; votes: number};
const Question: React.FC = () => {
  const {questionId} = useParams() || '';
  const [question, setQuestion] = useState<QuestionType>();
  const [choiceSelected, setChoiceSelected] = useState<ChoiceSelected>({
    votes: -1,
    index: -1,
  });
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line require-jsdoc
    async function retrieveQuestion() {
      if (questionId) {
        const questionResponse = await getQuestion(questionId);
        setQuestion(questionResponse);
      }
    }

    retrieveQuestion();
  }, [questionId]);

  const handleVoteClick = (question: QuestionType) => {
    updateQuestion(question);
  };
  return (
    <Container>
      <Toolbar>
        <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft size={16} />
          </BackButton>
          Question
        </div>
      </Toolbar>
      <Content>
        <QuestionContainer>
          {question?.question}
          <ShareButton
            urlToShare={window.location.href}
            inputProps={{placeholder: 'email@example.com'}}
          />
        </QuestionContainer>
        <ChoicesContainer>
          <ChoiceTitle>Choices</ChoiceTitle>
          {question?.choices.map((choice, index) => {
            return (
              <div key={index} style={{display: 'flex'}}>
                <ChoiceBox>
                  <div>{choice.choice}</div>
                  <div
                    style={{
                      fontSize: 12,
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      color: 'gray',
                    }}
                  >
                    {choice.votes} votes
                    <IconButton
                      onClick={() => {
                        const questionUpdate = Object.assign({}, question);
                        const newChoiceSelected = {
                          index: -1,
                          votes: -1,
                        };
                        let votes = questionUpdate.choices[index].votes;
                        if (choiceSelected.index !== index) {
                          const votesOld = choiceSelected.votes;
                          votes += 1;

                          if (votesOld > -1) {
                            questionUpdate.choices[
                              choiceSelected.index
                            ].votes -= 1;
                          }
                          newChoiceSelected.index = index;
                          newChoiceSelected.votes = votes;
                        } else {
                          votes -= 1;
                        }
                        questionUpdate.choices[index].votes = votes;
                        setChoiceSelected(newChoiceSelected);
                        setQuestion(questionUpdate);
                        handleVoteClick(questionUpdate);
                      }}
                    >
                      <FaThumbsUp
                        size={12}
                        style={{
                          color:
                            choiceSelected.index === index
                              ? 'var(--primary)'
                              : '',
                        }}
                      />
                    </IconButton>
                  </div>
                </ChoiceBox>
              </div>
            );
          })}
        </ChoicesContainer>
      </Content>
    </Container>
  );
};

export default Question;
