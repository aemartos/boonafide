import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthAPI } from '../lib/auth';
import { logout, clearMessages } from '../lib/redux/actions';
import styled from '@emotion/styled';

const NavMenu = styled.nav`
  a {
    margin-right: 1em;
    /*display:inline-block;
    background: white;
    padding: 5px;
    margin: 5px;
    color:black;
    text-decoration: none;
    &.active{
      color: red;
    } */
  }
`;

export const Menu = connect(store => ({user: store.user}))(({user, dispatch}) => {
  return (
    <NavMenu>
      <NavLink exact to="/" onClick={()=> dispatch(clearMessages())}>Home</NavLink>
      <NavLink to="/philosophy" onClick={()=> dispatch(clearMessages())}>Philosophy</NavLink>
      {user ?
        <React.Fragment>
          <NavLink to="/profile" onClick={()=> dispatch(clearMessages())}>Profile</NavLink>
          <a href="#0" onClick={() => AuthAPI.logout().then(() => dispatch(logout()))}>Logout</a>
        </React.Fragment>
      :
        <React.Fragment>
          <NavLink to="/login" onClick={()=> dispatch(clearMessages())}>Login</NavLink>
          <NavLink to="/signup" onClick={()=> dispatch(clearMessages())}>Signup</NavLink>
        </React.Fragment>
      }
    </NavMenu>
  )
});
