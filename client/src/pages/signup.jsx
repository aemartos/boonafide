import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { SignUpForm } from '../components/SignUpForm';
import { Messages } from '../components/Messages';

const StyledSignUp = styled.div`
  height: 100% !important;
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
    margin: 0 auto 1em;
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
    .account-message {
      text-align: center;
      margin-top: 2em;
      font-size: .8em;
      opacity: .5;
      a {
        color: ${colors.grey};
        text-decoration: underline;
      }
    }
  }
`;

export const SignUpPage = () => (
  <StyledSignUp>
    <div className="box-container signup">
      <div className="title-box">
        <h2>join boonafide</h2>
        <p>and be part of the favor chain that is changing the world!</p>
      </div>
      <SignUpForm />
      <Messages />
      <div>
        <p className="account-message">
          <span>do you already have an account?</span>
          <span><Link to="/login">login</Link> or <Link to="/">go back</Link></span>
        </p>
      </div>
    </div>
  </StyledSignUp>
);
