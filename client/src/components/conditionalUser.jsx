import React from 'react';
import {connect} from 'react-redux';

export const conditionalUser = (ComponentUser,ComponentNoUser) => connect(state => ({user:state.user}))(props =>{
  const {user} = props;
  if(user){
    return  <ComponentUser {...props}/>
  }else{
    return  <ComponentNoUser {...props}/>
  }
})
