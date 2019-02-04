import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthAPI } from '../lib/API/auth';
import { logout, clearMessages, setBusy } from '../lib/redux/actions';
import { colors } from '../lib/common/colors';
import styled from '@emotion/styled';

const TopNav = styled.nav`
  height: 5em;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.purple};
  box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.33);
  a {
    color: ${colors.grey};
    &.logoutBtn {
      margin: 1em 0 0 1em;
    }
    &.profile-pic {
      width: 3em;
      height: 3em;
      margin: 1em 1em 0 0;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
`;

export const TopMenu = connect(store => ({user: store.user}))(({user, dispatch}) => {
  return (
    <TopNav>
      <a className="logoutBtn" href="#0" onClick={() => AuthAPI.logout().then(() => dispatch(logout())).catch(() => dispatch(setBusy(false)))}>Logout</a>
      <NavLink className="profile-pic" to="/profile" onClick={()=> dispatch(clearMessages())}> <img src={user.pictureUrl} alt={`${user.name} profile`}/></NavLink>
    </TopNav>
  )
});
