import { axiosInstance } from '../common/helpers';

export class AuthAPI {
  static errorHandler(e) {
    // console.error("AUTH API ERROR");
    // console.error(e.response.data);
    throw e.response.data;
  }

  static currentUser() {
    return axiosInstance.get('/api/auth/currentuser')
      .then(res => res.data.user)
      .catch(AuthAPI.errorHandler);
  }

  static login(username, password) {
    return axiosInstance.post('/api/auth/login', { username, password })
      .then(res => res.data)
      .catch(e => AuthAPI.errorHandler(e));
  }

  static signup(username, email, password) {
    return axiosInstance.post('/api/auth/signup', { username, email, password })
      .then(res => res.data.user)
      .catch(e => AuthAPI.errorHandler(e));
  }

  static logout(username, password) {
    return axiosInstance.get('/api/auth/logout')
      .then((res) => { /* console.log(res, "Logout") */ })
      .catch(AuthAPI.errorHandler);
  }
}
