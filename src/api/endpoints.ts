import axios from '@/api/axios';

export const test = () => {
  return axios.get(`/test`);
};
