import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  withCredentials: true,
  crossDomain: true
});

export class AuthAPI {
  static errorHandler(e) {
    //console.error("AUTH API ERROR");
    console.error(e.response.data);
    throw e.response.data;
  }

  static currentUser(){
    return instance.get('/api/auth/currentuser')
      .then((res) => res.data.user)
      .catch(AuthAPI.errorHandler)
  }

  static login(username, password){
    return instance.post('/api/auth/login',{username, password})
      .then((res) => res.data)
      .catch((e)=> AuthAPI.errorHandler(e))
  }

  static signup(username, password){
    return instance.post('/api/auth/signup',{username, password})
      .then((res) => res.data.user)
      .catch((e)=> AuthAPI.errorHandler(e))
  }

  static logout(username, password){
    return instance.get('/api/auth/logout')
      .then((res) => {/*console.log(res, "Logout")*/})
      .catch(AuthAPI.errorHandler)
  }
}
