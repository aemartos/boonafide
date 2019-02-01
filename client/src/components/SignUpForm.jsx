import React from 'react';
import { AuthAPI } from '../lib/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, clearMessages } from '../lib/redux/actions';
import { timeOutMessages } from '../lib/common/helpers';

class _SignUpForm extends React.Component {

  constructor(){
    super();
    this.state = {
      username:"",
      email: "",
      password:""
    }
  }

  handleSignUp(){
    const {username, email, password} = this.state;
    const {history, dispatch} = this.props;
    AuthAPI.signup(username, email, password)
    .then( user =>{
      dispatch(clearMessages());
      dispatch(login(user))
      history.push('/profile');
    })
    .catch( e => {
      timeOutMessages(dispatch, e);
      history.push('/signup');
    });
  }

  render() {
    const {username, email, password} = this.state;
    return (
      <div>
        <h2>Signup</h2>
        <label>Username</label>
        <input value={username} onChange={e => this.setState({username: e.target.value})}/>
        <label>Email</label>
        <input value={email} type="email" onChange={e => this.setState({email: e.target.value})}/>
        <label>Password</label>
        <input value={password} type="password" onChange={e => this.setState({password: e.target.value})}/>
        <button onClick={() => this.handleSignUp()}>Signup</button>
      </div>
    );
  }
};

export const SignUpForm = connect()(withRouter(_SignUpForm));
