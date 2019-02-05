import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import { TopMenu } from './TopMenu';
import { BottomMenu } from './BottomMenu';
import { colors } from '../lib/common/colors';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey};
  @media (orientation: landscape) {
    display: block;
    height: unset;
  }
  h1, h2, h3, h4, p {
    margin-top: 0;
  }
  .contentBox {
    height: calc(100% - 9.5em);
    width: 100%;
    overflow: auto;
    margin-top: .5em;
    .container {
      height: 100%;
      width: 80%;
      margin: 0 auto;
    }
  }
`;

const _Container = (props) => {
  const {className, children, user, location} = props;
  return (
    <StyledContainer className={className}>
      {(user && !user.newUser) ? <TopMenu/> : null}
      {children}
      {(user && !user.newUser) ? <BottomMenu location={location}/> : null}
    </StyledContainer>
  );
};

export const Container = connect(state => ({user: state.user}))(_Container);
