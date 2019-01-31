import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

export const withUser = (Component, redirectTo="/login") => connect(state => ({user:state.user}))(props =>{
  const {user} = props;
  console.log("Hey");
  console.log(user);
  if(user){
    return  <Component {...props}/>
  }else{
    return <Redirect to={{pathname:redirectTo}} />
  }
})
