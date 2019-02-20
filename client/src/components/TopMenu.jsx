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
  z-index: 2;
  .pathName {
    font-family: "Baloo Bhaina";
    font-size: 1.3em;
    color: ${colors.grey};
    margin-top: 1.3em;
    text-transform: capitalize;
  }
  a, .icon {
    color: ${colors.grey};
    &.btn {
      font-size: 1.6em;
      margin: 1em 0 0 1em;
    }
    &.btn-arrow {
      margin: 1.3em 0 0 2em;
      font-size: 1em;
      &:before{
        transform: rotate(180deg);
      }
    }
    &.profile-pic {
      width: 3em;
      height: 3em;
      margin: 1em 1em 0 0;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 3em;
        object-fit: cover;
      }
    }
  }
`;

export const TopMenu = connect(store => ({user: store.user}))(({user, dispatch, location, history}) => {
  return (
    <TopNav>
      {location.pathname.startsWith('/tickets') || location.pathname.startsWith('/messages/') ?
        <React.Fragment>
          <span className="icon btn-arrow b-arrow-short" onClick={()=> history.goBack()}></span>
          {location.pathname.startsWith('/tickets') ? <span className="pathName">{location.pathname.split('/')[1]}</span> : null }
        </React.Fragment>
      :
        <a className="btn" href="#0" onClick={() => AuthAPI.logout().then(() => dispatch(logout())).catch(() => dispatch(setBusy(false)))}><span className="icon b-logout"></span></a>
      }
      <NavLink className="profile-pic" to="/profile" onClick={()=> dispatch(clearMessages())}> <img src={user.pictureUrl} alt={`${user.name} profile`}/></NavLink>
    </TopNav>
  )
});
