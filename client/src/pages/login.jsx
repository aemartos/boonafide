import React from 'react';
// import { Link } from 'react-router-dom';
import { LogInForm } from '../components/LogInForm';
import { Messages } from '../components/Messages';

export const LogInPage = () => {
  return (
    <React.Fragment>
      <LogInForm/>
      <Messages/>
      <div>
        <a href="http://localhost:3001/api/auth/facebook"><button>Facebook</button></a>
        <a href="http://localhost:3001/api/auth/google"><button>Google</button></a>
      </div>
      <div>
        <p className="account-message">
          <span>don't have an account yet?</span> <span><a href="/signup">signup</a> or <a href="/">go back</a></span>
        </p>
      </div>
    </React.Fragment>
  )
}
