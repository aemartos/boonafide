import { createStore } from 'redux'
import { rootReducer } from './reducer';
import { login, setBusy } from "./actions";
//import { login, errorMessageAction } from "./actions";
import { AuthAPI } from '../auth';


export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

AuthAPI.currentUser().then(user => {
  store.dispatch(login(user))
}).catch(e => store.dispatch(setBusy(false)))
//.catch(e => store.dispatch(errorMessageAction("Login is needed")))
