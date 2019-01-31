import React from 'react';
import { AuthAPI } from '../lib/auth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { login, clearMessages } from '../lib/redux/actions';
import { timeOutMessages } from '../lib/common/helpers';
import { Button } from './Button';
import FormField from './FormField';


const StyledForm = styled.div`

`;

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
      console.log(history);
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
      <StyledForm>
        <h3>or</h3>
        <h2>Login</h2>
        <div className="form">
          <FormField label="username" type="text" placeholder="write your username" onChange={e => this.setState({username: e.target.value})} value={username}/>
          <FormField label="password" type="password" placeholder="write your password" onChange={e => this.setState({password: e.target.value})} value={password}/>
          <Button className="btn" onClick={() => this.handleLogin()}>login</Button>
        </div>
      </StyledForm>
    );
  }
};

export const LogInForm = connect()(withRouter(_LogInForm));
