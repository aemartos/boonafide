import axios from 'axios';
import { errorMessageAction, clearMessages } from '../redux/actions';

export const timeOutMessages = (dispatch, msg, time = 3000) => {
  dispatch(errorMessageAction(msg));
  setTimeout(() => dispatch(clearMessages()), time);
}

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  withCredentials: true,
  crossDomain: true
});
