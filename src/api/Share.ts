import axios from 'axios';
import {HTTP_STATUS_OK} from '../constants/httpStatus';

export const shareLink = async (
  email: string,
  url: string,
): Promise<boolean> => {
  const res = await axios.post(
    `share?destination_email=${email}&content_url=${url}`,
  );
  if (res.status === HTTP_STATUS_OK) return true;

  return false;
};
