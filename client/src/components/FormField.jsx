import React, { Component } from "react";
import styled from '@emotion/styled';
import {colors} from '../lib/common/colors';

const StyledForm = styled.div`
  width: 100%;
  label {
    width: 100%;
    margin: ${({label}) => (label === undefined) ? '0' : '1em 0'};
    font-weight: bold;
  }
  .control {
    margin-top: 1em;
    display: flex;
    flex-flow: row nowrap;
    justify: flex-start;
    align-items: center;
    span {
      &.tagName {
        margin-left: .5em;
      }
    }
    input, button, textarea, select {
      width: 100%;
      padding: .8em 1em;
      margin-bottom: 1em;
      box-shadow: none;
      background: transparent;
      outline: 0;
      color: ${colors.black};
      font-size: .9em;
      border: none;
      /* border: 2px solid #eee; */
      &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus {
        -webkit-text-fill-color: ${colors.grey};
        -webkit-box-shadow: 0 0 0px 1000px ${colors.white} inset;
      }
      &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder, &:-moz-placeholder {
        color: ${colors.black};
        opacity: .5;
      }
    }
    input {
      border-radius: 5em;
      padding: .5em 1em;
      margin: ${({label}) => (label === undefined) ? '0' : '1em 0'};
      &[type='checkbox'] {
        width: auto;
      }
    }
  }
`;

export default class FormField extends Component {
  render() {
    const {label, type, placeholder, onChange, value} = this.props;
    return (
      <StyledForm>
        <label className="label">{label}</label>
        <div className="control">
          <input className="input" type={type} placeholder={placeholder} onChange={onChange} value={value}/>
        </div>
      </StyledForm>
    );
  }
}
