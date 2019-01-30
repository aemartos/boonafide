import React from 'react';
import { Link } from 'react-router-dom';
import { SignUpForm } from '../components/SignUpForm';
import { Messages } from '../components/Messages';

export const SignUpPage = () => {
  return (
    <div>
      <SignUpForm/>
      <Messages/>
      <div>
        <p class="account-message">
          <span>do you already have an account?</span> <span><Link to="/login">login</Link> or <Link to="/getStarted">go back</Link></span>
        </p>
      </div>
    </div>
  )
}
