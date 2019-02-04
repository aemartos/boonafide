import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthAPI } from '../lib/API/auth';
import { logout, clearMessages, setBusy } from '../lib/redux/actions';
import styled from '@emotion/styled';

const TopNav = styled.nav`
  height: 3em;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background-color: black;
  a {
    margin-right: 1em;
  }
`;

export const TopMenu = connect(store => ({user: store.user}))(({user, dispatch}) => {
  return (
    <TopNav>
      <a href="#0" onClick={() => AuthAPI.logout().then(() => dispatch(logout())).catch(() => dispatch(setBusy(false)))}>Logout</a>
      <NavLink to="/profile" onClick={()=> dispatch(clearMessages())}>Profile</NavLink>
    </TopNav>
  )
});
