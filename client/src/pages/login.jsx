import React from 'react';
import { Link } from 'react-router-dom';
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
  color: ${colors.grey};
  @media (orientation: landscape) {
    display: block;
    height: unset;
    padding: 4em 0;
  }
  .box-container {
    width: 80%;
    margin: 0 auto;
    .title-box {
      text-align: center;
      font-family: "Baloo Bhaina";
      line-height: 1.3em;
      margin-bottom: 2em;
      h2 {
        font-size: 2em;
        margin-bottom: .5em;
      }
      p {
        font-size: 1.1em;
        opacity: .6;
        font-family: "Open Sans";
        font-weight: 600;
      }
    }
    .basic-text, .account-message {
      text-align: center;
      margin-top: 2em;
      font-size: .8em;
      opacity: .5;
      &.m-bottom {
        margin-bottom: 1.5em;
      }
      a {
        color: ${colors.grey};
        text-decoration: underline;
      }
    }
  }
`;

export const LogInPage = () => {
  return (
    <StyledLogIn>
      <div className="box-container">
        <div className="title-box">
          <h2>welcome back ;)</h2>
          <p>login your account to start changing the world!</p>
        </div>
        <p className="basic-text">continue with</p>
        <div className="social-login">
          <Button link="http://localhost:3001/api/auth/facebook" className="btn btn-fcbk" redirect={true}>facebook</Button>
          <Button link="http://localhost:3001/api/auth/google" className="btn btn-ggl" redirect={true}>google</Button>
        </div>
        <p className="basic-text m-bottom">or your username</p>
        <LogInForm/>
        <Messages/>
        <div>
          <p className="account-message">
            <span>don't have an account yet?</span> <span><Link to="/signup">signup</Link> or <Link to="/">go back</Link></span>
          </p>
        </div>
      </div>
    </StyledLogIn>
  )
}
