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
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey};
  border-radius: 5em;
  box-shadow: 0px 10px 20px 10px rgba(0,0,0,0.33);
  /*border-top-right-radius: 2.5em;
  border-top-left-radius: 2.5em;*/
  a {
    color: ${colors.purple};
    margin-right: 1em;
  }
`;

export const BottomMenu = connect(store => ({user: store.user}))(({user, dispatch}) => {
  return (
    <BottomNav>
      <NavLink exact to="/" onClick={()=> dispatch(clearMessages())}>Home</NavLink>
      <NavLink to="/philosophy" onClick={()=> dispatch(clearMessages())}>Phlphy</NavLink>
      <NavLink to="/newFavor" onClick={()=> dispatch(clearMessages())}>New</NavLink>
      <NavLink to="/messages" onClick={()=> dispatch(clearMessages())}>MP</NavLink>
      <NavLink to="/notifications" onClick={()=> dispatch(clearMessages())}>Not</NavLink>
    </BottomNav>
  )
});
