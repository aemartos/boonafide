import { errorMessageAction, clearMessages } from '../redux/actions';

export const timeOutMessages = (dispatch, msg, time = 3000) => {
  dispatch(errorMessageAction(msg));
  setTimeout(() => dispatch(clearMessages()), time);
}
