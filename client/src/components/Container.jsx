import React from 'react';
import styled from '@emotion/styled';

import { TopMenu } from './TopMenu';
import { BottomMenu } from './BottomMenu';

const StyledContainer = styled.div`
  height: 100%;
`;

export const Container = (props) => {
  const {className, children} = props;
  return (
    <StyledContainer className={className}>
      <TopMenu/>
      {children}
      <BottomMenu/>
    </StyledContainer>
  );
}
