import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const GetStartedPage = connect(store => ({user: store.user}))(({user, dispatch}) => {
  return (
    <React.Fragment>
      <NavLink to="/login" onClick={()=> dispatch()}>Login</NavLink>
      <NavLink to="/signup" onClick={()=> dispatch()}>Signup</NavLink>
    </React.Fragment>
  )
});
