import React from 'react';
import { Link } from 'react-router-dom';
import { LogInForm } from '../components/LogInForm';
import { Messages } from '../components/Messages';

export const LogInPage = ({history}) => {
  return (
    <React.Fragment>
      <LogInForm/>
      <Messages/>
      <div>
        <a href="http://localhost:3001/api/auth/facebook"><button>Facebook</button></a>
        <a href="http://localhost:3001/api/auth/google"><button>Google</button></a>
      </div>
      <div>
        <p class="account-message">
          <span>don't have an account yet?</span> <span><Link to="/signup">signup</Link> or <Link to="/getStarted">go back</Link></span>
        </p>
      </div>
    </React.Fragment>
  )
}
