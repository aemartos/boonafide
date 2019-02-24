import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { Button } from '../components/Button';
import { validateStart, validateStop } from '../lib/common/validation.helpers';

const StyledValidation = styled.div`
  position: absolute;
  top: ${props => props.validating ? "0px" : "51em"};
  bottom: 0;
  width: 100%;
  padding: 2.4em 2em;
  background-color: ${colors.purple};
  z-index: 4;
  -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  .icon {
    position: absolute;
    top: 2.45em;
    left: 2em;
    color: ${colors.grey};
    font-size: 1em;
    &:before{
      transform: rotate(180deg);
    }
  }
  .text {
    color: ${colors.grey};
    text-align: center;
    .title {
      font-family: "Baloo Bhaina";
      line-height: 1.2em;
    }
    .subtitle {
      font-weight: 100;
      font-size: 1.2em;
    }
  }
  svg {
    display: block;
    width: 80%;
    margin: 2em auto;
    path {
      fill: none;
      stroke-width: 14;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
      &.front {
        stroke: ${colors.orange};
      }
      &.back {
        stroke: ${colors.grey};
      }
    }
    circle {
      fill: ${colors.lightOrange};
      opacity: .5;
    }
  }
  .btn {
    width: 100%;
  }
`;

export default class ValidationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false
    }
  }
  handleClose() {
    this.props.closeValidation(false);
  }
  handleValidate() {
    alert("Validated");
  }
  componentDidMount() {
    validateStart(this.handleValidate);
  }
  componentWillUnmount() {
    validateStop();
  }
  render() {
    const {validating, validated} = this.props;
    const display = {
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
      alignItems: "center"
    }
    return (
      <StyledValidation validating={validating} style={validating ? display : null}>
      {!validated ?
        <React.Fragment>
          <span className="icon b-arrow-short" onClick={()=>this.handleClose()}></span>
          <div className="text">
            <h2 className="title">Validate your ticket</h2>
            <p className="subtitle">Trace the “B” to validate the ticket, be sure when you do that, you can only validated once.</p>
          </div>
          <div className="animation">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 108.1 108.1">
              <path className="path back" id="path" d="M7,41.6v59.5h65c16,0,29.1-13.1,29.1-29.1l0,0c0-16-13.1-29.1-29.1-29.1h-6.7v-6.7C65.3,20.1,52.1,7,36.1,7l0,0
              C20.1,7,7,20.1,7,36.1V41.6"/>
              <path className="path front" id="drawMe" fill="transparent" d="M7,41.6v59.5h65c16,0,29.1-13.1,29.1-29.1l0,0c0-16-13.1-29.1-29.1-29.1h-6.7v-6.7C65.3,20.1,52.1,7,36.1,7l0,0
              C20.1,7,7,20.1,7,36.1V41.6"/>
              <circle className="circle oval knob" id="drag" cx="0" cy="0" r="7"/>
            </svg>
          </div>
        </React.Fragment>
      : null}
      </StyledValidation>
    );
  }
}
