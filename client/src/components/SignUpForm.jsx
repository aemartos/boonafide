import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthAPI } from '../lib/API/auth';

import { login, clearMessages } from '../lib/redux/actions';
import { timeOutMessages } from '../lib/common/helpers';
import { Button } from './Button';
import FormField from './FormField';

class _SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  handleSignUp() {
    const { username, email, password } = this.state;
    const { history, dispatch } = this.props;
    AuthAPI.signup(username, email, password)
      .then((user) => {
        dispatch(clearMessages());
        dispatch(login(user));
        history.push('/firstSteps');
      })
      .catch((e) => {
        timeOutMessages(dispatch, e);
      });
  }

  render() {
    const { username, email, password } = this.state;
    return (
      <div className="form">
        <FormField type="text" placeholder="write your username" onChange={(e) => this.setState({ username: e.target.value })} value={username} onKeyUp={(e) => { if (e.keyCode === 13) { this.handleSignUp(); } }} />
        <FormField type="email" placeholder="write your email" onChange={(e) => this.setState({ email: e.target.value })} value={email} onKeyUp={(e) => { if (e.keyCode === 13) { this.handleSignUp(); } }} />
        <FormField type="password" placeholder="write your password" onChange={(e) => this.setState({ password: e.target.value })} value={password} onKeyUp={(e) => { if (e.keyCode === 13) { this.handleSignUp(); } }} />
        <Button className="btn" onClick={() => this.handleSignUp()}>sign up</Button>
      </div>
    );
  }
}

export const SignUpForm = connect()(withRouter(_SignUpForm));
