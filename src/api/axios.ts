import axios, {AxiosInstance} from 'axios';
import {clearSession, getRefreshToken} from '@/utils/auth';

const createAxiosResponseInterceptor = (
  axios: AxiosInstance,
  loginUrl: string
) => {
  const interceptor = axios.interceptors.response.use(
    response => response,
    error => {
      const isLoginPage = window.location.pathname === loginUrl;
      // Reject promise if usual error or login page
      if (error.response.status !== 401 || isLoginPage) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      axios.interceptors.response.eject(interceptor);

      return axios
        .post('/auth/refresh', {
          refresh_token: getRefreshToken()
        })
        .then(response => {
          error.response.config.headers[
            'Authorization'
          ] = `Bearer ${response.data.accessToken}`;
          return axios(error.response.config);
        })
        .catch(error => {
          clearSession();
          window.location.href = loginUrl;
          return Promise.reject(error);
        });
    }
  );
};

const AXIOS = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.API_BASE_URL
});

createAxiosResponseInterceptor(AXIOS, '/login');

export default AXIOS;
