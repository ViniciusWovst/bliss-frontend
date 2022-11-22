import {UseQueryResult, useQuery, UseQueryOptions} from 'react-query';
import {getQuestions, Question, getQuestion} from '../api/Questions';

export const QUESTION_OFFSET = 10;
export const QUESTION_LIMIT = 10;

export const useFetchQuestions = (
  limit: number = QUESTION_OFFSET,
  offset: number = QUESTION_LIMIT,
  filter: string = '',
  configOptions?: UseQueryOptions<Question[], Error>,
): UseQueryResult<Question[], Error> => {
  return useQuery<Question[], Error>(
    ['questions', offset],
    () => getQuestions(limit, offset, filter),
    configOptions,
  );
};

export const useFetchQuestionsSearch = (
  filter: string = '',
  configOptions?: UseQueryOptions<Question[], Error>,
): UseQueryResult<Question[], Error> => {
  return useQuery<Question[], Error>(
    'questionsSearch',
    () => getQuestions(QUESTION_LIMIT, QUESTION_OFFSET, filter),
    configOptions,
  );
};

export const useFetchQuestion = (
  questionId: string,
  configOptions?: UseQueryOptions<Question, Error>,
): UseQueryResult<Question, Error> => {
  return useQuery<Question, Error>(
    'question' + questionId,
    () => getQuestion(questionId),
    configOptions,
  );
};
