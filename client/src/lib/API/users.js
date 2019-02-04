import { axiosInstance } from '../common/helpers';

export class UsersAPI {
  static errorHandler(e) {
    console.error(e.response.data);
    throw e.response.data;
  }

  static updateUser(data){
    return axiosInstance.post('/api/users/updateUser', { data })
      .then((res) => true)
      .catch((e)=> UsersAPI.errorHandler(e))
  }
}
