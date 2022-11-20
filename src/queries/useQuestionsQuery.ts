import {UseQueryResult, useQuery, UseQueryOptions} from 'react-query';
import {getQuestions, Question} from '../api/Questions';

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
