import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { Button } from '../components/Button';

const StyledValidation = styled.div`
  position: absolute;
  top: ${props => props.validating ? "0" : "51em"};
  bottom: 0;
  width: 100%;
  padding: 2.4em 2em;
  background-color: ${colors.purple};
  z-index: 4;
  -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  .icon {
    color: ${colors.grey};
    font-size: 1em;
    &:before{
      transform: rotate(180deg);
    }
  }
`;

export default class ValidationComponent extends React.Component {
  handleClose() {
    this.props.closeValidation(false);
  }
  handleValidate() {

  }
  render() {
    const {validating} = this.props;
    return (
      <StyledValidation validating={validating}>
        <span className="icon b-arrow-short" onClick={()=>this.handleClose()}></span>
        <Button link="" onClick={()=> this.handleValidate()} className="btn">Validate</Button>
      </StyledValidation>
    );
  }
}
