import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearMessages } from '../lib/redux/actions';
import { colors } from '../lib/common/colors';
import styled from '@emotion/styled';

const BottomNav = styled.nav`
  height: 4.5em;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: ${props => props.is404 ? colors.purple : colors.grey};
  border-radius: 5em;
  box-shadow: 0px 10px 20px 10px rgba(0,0,0,0.33);
  /*border-top-right-radius: 2.5em;
  border-top-left-radius: 2.5em;*/
  .nav {
    width: 80%;
    margin: 1.3em auto 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: space-between;
    a {
      color: ${props => props.is404 ? colors.grey : colors.purple};
      margin-right: 1.2em;
      .icon {
        font-size: 1.7em;
        &.b-messages {
          font-size: 1.9em;
        }
      }
      &.active {
        color: ${colors.orange};
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const BottomMenu = connect(store => ({user: store.user}))(({user, dispatch, location}) => {
  console.log(location);
  return (
    // <BottomNav style={{backgroundColor: (location.pathname === '/not-found' ? colors.purple : colors.grey), color: (location.pathname === '/not-found' ? colors.grey : colors.purple)}}>
    <BottomNav is404={location.pathname === '/not-found'}>
      <div className="nav">
        <NavLink exact to="/" onClick={()=> dispatch(clearMessages())}><span className="icon b-homem"></span></NavLink>
        <NavLink to="/philosophy" onClick={()=> dispatch(clearMessages())}><span className="icon b-philosophy"></span></NavLink>
        <NavLink to="/newFavor" onClick={()=> dispatch(clearMessages())}><span className="icon b-newfavor"></span></NavLink>
        <NavLink to="/messages" onClick={()=> dispatch(clearMessages())}><span className="icon b-messages"></span></NavLink>
        <NavLink to="/notifications" onClick={()=> dispatch(clearMessages())}><span className="icon b-notifications"></span></NavLink>
      </div>
    </BottomNav>
  )
});
