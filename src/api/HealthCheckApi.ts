import axios from 'axios';
import {HTTP_STATUS_OK} from '../constants/httpStatus';

export const healthCheck = async (): Promise<boolean> => {
  const res = await axios.get(`health`);
  if (res.status === HTTP_STATUS_OK) return true;

  return false;
};
