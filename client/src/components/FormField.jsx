import React, { Component } from "react";
import styled from '@emotion/styled';
import {colors} from '../lib/common/colors';

const StyledForm = styled.div`
  width: 100%;
  margin-top: ${label => (label === undefined) ? '0' : '.8em'};
  label {
    width: 100%;
    font-weight: bold;
  }
  .control {
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
      background: ${colors.lightPurple};
      outline: 0;
      color: ${colors.purple};
      font-size: .9em;
      font-weight: 800;
      border: none;
      &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active {
        -webkit-text-fill-color: ${colors.purple};
        -webkit-box-shadow: 0 0 0px 1000px ${colors.lightPurple} inset;
        transition: background-color 5000s ease-in-out 0s;
      }
      &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder, &:-moz-placeholder {
        color: ${colors.purple};
        opacity: .5;
      }
    }
    input {
      border-radius: 5em;
      padding: .7em 1em;
      margin: ${label => (label === undefined) ? '0' : '.5em 0'};
      &[type='checkbox'] {
        width: auto;
      }
    }
    input::placeholder {
      color: ${colors.purple};
      /* opacity: .5; */
      font-weight: 400 !important;
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
