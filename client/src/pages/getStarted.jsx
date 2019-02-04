import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { Button } from '../components/Button';
import { InitCarousel } from '../components/InitCarousel';
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
  .bottom-box {
    flex: 1;
    width: 100%;
    padding-top: 3em;
    margin-top: -.2em;
    background-color: ${colors.darkGrey};
    .actions {
      width: 80%;
      margin: 0 auto;
    }
  }
`;


export const GetStartedPage = connect(store => ({user: store.user}))(({user, dispatch}) => {

  return (
    <StyledGetStarted>
      <InitCarousel/>
      <div className="bottom-box">
        <div className="actions">
          <Button link="/login" className="btn">login</Button>
          <Button link="/signup" className="btn btn-primary">sign up</Button>
        </div>
      </div>
    </StyledGetStarted>
  )
});
