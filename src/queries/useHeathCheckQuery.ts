import {UseQueryResult, useQuery} from 'react-query';
import {healthCheck} from '../api/HealthCheckApi';

export const useHeathCheck = (): UseQueryResult<boolean, Error> => {
  return useQuery<boolean, Error>(`heathCheck`, () => healthCheck());
};
