import React from 'react';
import { AuthAPI } from '../lib/API/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, clearMessages } from '../lib/redux/actions';
import { timeOutMessages } from '../lib/common/helpers';
import { Button } from './Button';
import FormField from './FormField';


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
      history.push('/');
    })
    .catch( e => {
      timeOutMessages(dispatch, e.message);
      history.push('/login');
    });
  }

  render() {
    const {username, password} = this.state;
    return (
      <React.Fragment>
        <div className="form">
          <FormField type="text" placeholder="write your username" onChange={e => this.setState({username: e.target.value})} value={username}/>
          <FormField type="password" placeholder="write your password" onChange={e => this.setState({password: e.target.value})} value={password}/>
          <Button className="btn" onClick={() => this.handleLogin()}>login</Button>
        </div>
      </React.Fragment>
    );
  }
};

export const LogInForm = connect()(withRouter(_LogInForm));
