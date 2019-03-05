import { axiosInstance } from '../common/helpers';

export class UsersAPI {
  static errorHandler(e) {
    // console.error(e.response.data);
    throw e.response.data;
  }

  static getUser(id) {
    return axiosInstance.get(`/api/users/${id}`)
      .then(res => res.data)
      .catch(e => UsersAPI.errorHandler(e));
  }

  static updateUser(data) {
    return axiosInstance.post('/api/users/updateUser', { data })
      .then(res => true)
      .catch(e => UsersAPI.errorHandler(e));
  }
}
