import React from 'react';
// import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import {colors} from '../lib/common/colors';
import { Button } from '../components/Button';
import { LogInForm } from '../components/LogInForm';
import { Messages } from '../components/Messages';

const StyledLogIn = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${colors.purple};
  .social-login {
    width: 100%;
  }
`;

export const LogInPage = () => {
  return (
    <StyledLogIn>
      <div className="social-login">
        <Button link="http://localhost:3001/api/auth/facebook" className="btn btn-fcbk" redirect={true}>facebook</Button>
        <Button link="http://localhost:3001/api/auth/google" className="btn btn-ggl" redirect={true}>google</Button>
      </div>
      <LogInForm/>
      <Messages/>
      <div>
        <p className="account-message">
          <span>don't have an account yet?</span> <span><a href="/signup">signup</a> or <a href="/">go back</a></span>
        </p>
      </div>
    </StyledLogIn>
  )
}
