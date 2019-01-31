import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

import {colors} from '../lib/common/colors';

const StyledNavLink = styled(NavLink)`
    width: 80%;
    display: block;
    margin: 0 auto;
  &.btn {
    text-decoration: none;
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
    &:hover, &:active {
      opacity: .5;
      transform: scale(1.1,1.1);
      transition: (all 250ms cubic-bezier(0.4, 0, 0.2, 1));
    }
    &.btn-primary {
      background-color: ${colors.purple};
      color: ${colors.darkGrey};
    }
  }
`;

export const Button = (props) => {
  const {link, className, children, onClick} = props;
  return (
    <StyledNavLink to={link} className={className} onClick={onClick}>{children}</StyledNavLink>
  );
};
