import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';

const StyledValidation = styled.div`
  position: absolute;
  top: ${props => props.validating ? "5em" : "51em"};
  bottom: 0;
  width: 100%;
  background-color: ${colors.purple};
  z-index: 1;
  -webkit-transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 350ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export default class ValidationComponent extends React.Component {
  render() {
    const {validating} = this.props;
    return (
      <StyledValidation validating={validating}>
        <div className="validation">VALIDATION</div>
      </StyledValidation>
    );
  }
}
