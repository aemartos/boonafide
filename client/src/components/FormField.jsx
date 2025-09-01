import React, { Component } from 'react';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';

const StyledForm = styled.div`
  width: 100%;
  /* margin-top: ${(label) => ((label === undefined) ? '0' : '.8em')}; */
  label {
    width: 100%;
    font-weight: bold;
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
    /* border: none; */
    border: 2px solid ${colors.purple};
    &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active {
      -webkit-text-fill-color: ${colors.purple};
      -webkit-box-shadow: 0 0 0px 1000px ${colors.lightPurple} inset;
      transition: background-color 5000s ease-in-out 0s;
    }
    &:focus, &:active {
      -webkit-text-fill-color: ${colors.grey};
      border: 2px solid ${colors.grey};
    }
    &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder, &:-moz-placeholder {
      color: ${colors.purple};
      opacity: .5;
    }
  }
  input::placeholder {
    color: ${colors.purple};
    /* opacity: .5; */
    font-weight: 400 !important;
  }
  input.light::placeholder, input.line::placeholder {
    color: ${colors.midPurple};
  }
  input {
    border-radius: 5em;
    padding: .7em 1em;
    /* margin: ${(label) => ((label === undefined) ? '0' : '.5em 0')}; */
    &[type='checkbox'] {
      width: auto;
    }
    &.light {
      padding: .4em .7em;
      margin: 0;
      background: ${colors.midGrey};
      color: ${colors.midPurple};
      border: 2px solid ${colors.midPurple};
      &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active {
        -webkit-text-fill-color: ${colors.midPurple};
        -webkit-box-shadow: 0 0 0px 1000px ${colors.midGrey} inset;
        transition: background-color 5000s ease-in-out 0s;
      }
      &::placeholder, &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder, &:-moz-placeholder {
        color: ${colors.midPurple} !important;
      }
      &:focus, &:active {
        -webkit-text-fill-color: ${colors.midPurple};
        border: 2px solid ${colors.midPurple};
      }
    }
    &.line {
      padding: .4em .7em;
      margin: 0;
      font-weight: 400;
      background: transparent;
      color: ${colors.midPurple};
      border: 1px solid ${colors.midPurple};
      &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active {
        -webkit-text-fill-color: ${colors.midPurple};
        -webkit-box-shadow: 0 0 0px 1000px ${colors.midGrey} inset;
        transition: background-color 5000s ease-in-out 0s;
      }
      &::placeholder, &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder, &:-moz-placeholder {
        color: ${colors.midPurple} !important;
      }
      &:focus, &:active {
        -webkit-text-fill-color: ${colors.midPurple};
        border: 1px solid ${colors.midPurple};
      }
      &.form {
        border-radius: 0;
        border: 0;
        border-bottom: 1px solid ${colors.midPurple};
      }
    }
  }
`;
export default class FormField extends Component {
  render() {
    const {
      label, type, placeholder, onChange, onKeyUp, value, className,
    } = this.props;
    const id = `controlLabel-${Math.random().toString(36).substring(2, 15)}`;
    return (
      <StyledForm>
        <label htmlFor={id} className="label">{label}</label>
        <input id={id} className={`input ${className ?? ''}`} type={type} placeholder={placeholder} onChange={onChange} onKeyUp={onKeyUp} value={value} />
      </StyledForm>
    );
  }
}
