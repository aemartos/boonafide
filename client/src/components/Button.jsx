import React from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';

import { colors } from '../lib/common/colors';

const StyledLink = styled.span`
    display: block;
    /* width: 80%; */
    /* margin: 0 auto; */
  &.btn {
    outline: 0;
    box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.33);
    cursor: pointer;
    text-align: center;
    padding: .3em 0 .1em;
    margin-top: 1em;
    border-radius: 5em;
    background-color: ${colors.grey};
    color: ${colors.purple};
    font-family: "Baloo Bhaina";
    font-size: 1.1em;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover, &:active {
      /* opacity: .7; */
      /* transform: scale(1.1,1.1); */
      transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    &.btn-primary {
      background-color: ${colors.purple};
      color: ${colors.darkGrey};
    }
    &.btn-fcbk {
      background-color: ${colors.facebook};
      color: ${colors.grey};
    }
    &.btn-ggl {
      background-color: ${colors.google};
      color: ${colors.grey};
    }
    &.btn-confirm {
      background-color: ${colors.green};
      color: ${colors.grey};
    }
    &.btn-cancel {
      background-color: ${colors.orange};
      color: ${colors.grey};
    }
    &.disable {
      opacity: .4;
      pointer-events: none;
    }
  }
`;

const handleClick = (props) => {
  props.onClick && props.onClick();
  if (props.redirect) {
    window.location = props.link;
  } else if (props.link) {
    props.history.push(props.link);
  }
};

const _Button = (props) => {
  const { className, children } = props;
  return (
    <StyledLink className={className} onClick={(e) => { handleClick(props); }}>{children}</StyledLink>
  );
};

export const Button = withRouter(_Button);
