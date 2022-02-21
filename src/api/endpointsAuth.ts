import {authHeader} from '@/utils/auth';
import axios from '@/api/axios';

export const testAuth = () => {
  return axios.get(`/test`, {
    headers: authHeader()
  });
};
