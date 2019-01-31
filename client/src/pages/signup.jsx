import React from 'react';
// import { Link } from 'react-router-dom';
import { SignUpForm } from '../components/SignUpForm';
import { Messages } from '../components/Messages';

export const SignUpPage = () => {
  return (
    <div>
      <SignUpForm/>
      <Messages/>
      <div>
        <p className="account-message">
          <span>do you already have an account?</span> <span><a href="/login">login</a> or <a href="/">go back</a></span>
          {/* <span>do you already have an account?</span> <span><Link to="/login">login</Link> or <Link to="/">go back</Link></span> */}
        </p>
      </div>
    </div>
  )
}
