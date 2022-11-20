import {UseQueryResult, useQuery} from 'react-query';
import {healthCheck} from '../api/HealthCheckApi';

export const useHealthCheck = (): UseQueryResult<boolean, Error> => {
  return useQuery<boolean, Error>(`healthCheck`, () => healthCheck());
};
