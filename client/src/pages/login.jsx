import React from 'react';
import { LogInForm } from '../components/LogInForm';
import { Messages } from '../components/Messages';

export const LogInPage = ({history}) => {
  return (
    <React.Fragment>
      <LogInForm/>
      <Messages/>
    </React.Fragment>
  )
}
