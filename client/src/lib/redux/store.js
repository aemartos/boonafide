import { createStore } from 'redux'
import { rootReducer } from './reducer';
import { login } from "./actions";
//import { login, errorMessageAction } from "./actions";
import { AuthAPI } from '../auth';


export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

AuthAPI.currentUser().then(user => {
  store.dispatch(login(user))
}).catch(e => {})
//.catch(e => store.dispatch(errorMessageAction("Login is needed")))
