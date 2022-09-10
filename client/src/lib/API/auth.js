import { axiosInstance } from '../common/helpers';

export class AuthAPI {
  static errorHandler(error) {
    // console.error("------------> AUTH API ERROR", { error });
    const { response } = error;
    throw response ? response.data : error;
  }

  static currentUser() {
    return axiosInstance.get('/api/auth/currentuser')
      .then((res) => res.data.user)
      .catch(AuthAPI.errorHandler);
  }

  static login(username, password) {
    return axiosInstance.post('/api/auth/login', { username, password })
      .then((res) => res.data)
      .catch(AuthAPI.errorHandler);
  }

  static signup(username, email, password) {
    return axiosInstance.post('/api/auth/signup', { username, email, password })
      .then((res) => res.data.user)
      .catch(AuthAPI.errorHandler);
  }

  static logout() {
    return axiosInstance.get('/api/auth/logout')
      .then(() => { /* console.log(res, "Logout") */ })
      .catch(AuthAPI.errorHandler);
  }
}
