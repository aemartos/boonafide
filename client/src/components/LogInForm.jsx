import React from 'react';
import { AuthAPI } from '../lib/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, clearMessages } from '../lib/redux/actions';
import { timeOutMessages } from '../lib/common/helpers';

class _LogInForm extends React.Component {

  constructor(){
    super();
    this.state = {
      username:"",
      password:""
    }
  }

  handleLogin(){
    const {username, password} = this.state;
    const {history, dispatch} = this.props;
    AuthAPI.login(username, password)
    .then( user => {
      dispatch(clearMessages());
      dispatch(login(user))
      history.push('/profile');
    })
    .catch( e => {
      console.log("hola", e.message);
      timeOutMessages(dispatch, e.message);
      history.push('/login');
    });
  }

  render() {
    const {username, password} = this.state;
    return (
      <div>
        <h2>Login</h2>
        <label>Username</label>
        <input value={username} onChange={e => this.setState({username: e.target.value})}/>
        <label>Password</label>
        <input value={password} type="password" onChange={e => this.setState({password: e.target.value})}/>
        <button onClick={() => this.handleLogin()}>Login</button>
        <div>
          <a href="http://localhost:3001/api/auth/facebook"><button>Facebook</button></a>
          <a href="http://localhost:3001/api/auth/google"><button>Google</button></a>
        </div>
      </div>
    );
  }
};

export const LogInForm = connect()(withRouter(_LogInForm));
