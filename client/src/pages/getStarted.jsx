import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { Button } from '../components/Button';
import { Carousel } from '../components/Carousel';
import {colors} from '../lib/common/colors';

const StyledGetStarted = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey};
  .slick-slider {
    width: 100%;
    margin: 0 auto;
  }
  .actions {
    flex: 1;
    width: 100%;
    padding-top: 3em;
    margin-top: -.2em;
    background-color: ${colors.darkGrey};
  }
`;


export const GetStartedPage = connect(store => ({user: store.user}))(({user, dispatch}) => {

  return (
    <StyledGetStarted>
      <Carousel/>
      <div className="actions">
        <Button link="/login" className="btn">login</Button>
        <Button link="/signup" className="btn btn-primary">sign up</Button>
        {/* <NavLink to="/login" onClick={()=> dispatch()}>Login</NavLink>
        <NavLink to="/signup" onClick={()=> dispatch()}>Signup</NavLink> */}
      </div>
    </StyledGetStarted>
  )
});
