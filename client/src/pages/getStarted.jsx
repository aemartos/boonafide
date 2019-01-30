import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { Carousel } from '../components/Carousel';


const GetStarted = styled.div`
  height: 100%;
  width: 100%;
  .slick-slider {
    width: 50%;
    margin: 0 auto;
  }
  .actions {
    margin-top: 4em;
  }
  a {
    display: block;
  }
`;


export const GetStartedPage = connect(store => ({user: store.user}))(({user, dispatch}) => {

  return (
    <GetStarted>
      <Carousel/>
      <div className="actions">
        <NavLink to="/login" onClick={()=> dispatch()}>Login</NavLink>
        <NavLink to="/signup" onClick={()=> dispatch()}>Signup</NavLink>
      </div>
    </GetStarted>
  )
});
