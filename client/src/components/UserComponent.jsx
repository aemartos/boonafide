import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Spinner } from './Spinner';

const firstSteps = "/firstSteps";

export const WithUser = (Component, redirectTo = "/") => connect(state => ({user:state.user, isBusy: state.isBusy}))(props =>{
  const {user, isBusy, location} = props;
  if(user) {
    if (user.newUser && location.pathname !== firstSteps) {
      return <Redirect to={{pathname: firstSteps}}/>
    } else if (!user.newUser && location.pathname === firstSteps) {
      return <Redirect to={{pathname: redirectTo}}/>
    }
    return  <Component {...props}/>;
  } else if (user === undefined && isBusy) {
    return <Spinner/>;
  } else {
    return <Redirect to={{pathname: redirectTo}} />
  }
});

export const ConditionalUser = (ComponentUser, ComponentNoUser) => connect(state => ({user:state.user, isBusy: state.isBusy}))(props =>{
  const {user, isBusy, location} = props;
  if(user) {
    if (user.newUser && location.pathname !== firstSteps) {
      return <Redirect to={{pathname: firstSteps}}/>
    }
    return  <ComponentUser {...props}/>
  } else if (user === undefined && isBusy) {
    return <Spinner/>;
  } else {
    return  <ComponentNoUser {...props}/>
  }
});
