import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../../lib/common/colors';

const StyledInput = styled.input`
  width: 100%;
  padding: 1em 2em;
  margin: 0;
  box-shadow: none;
  background: ${colors.purple};
  outline: 0;
  color: ${colors.lightPurple};
  font-size: .9em;
  font-weight: 800;
  border: 0;
  &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active {
    -webkit-text-fill-color: ${colors.lightPurple};
    -webkit-box-shadow: 0 0 0px 1000px ${colors.purple} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  &:focus, &:active {
    -webkit-text-fill-color: ${colors.grey};
    border: 0;
  }
  &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder, &:-moz-placeholder {
    color: ${colors.lightPurple};
    opacity: .5;
  }
  &::placeholder {
    color: ${colors.lightPurple};
    font-weight: 400 !important;
  }
  &.line {
    border-radius: 5em;
    padding: .5em .7em;
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
`;

export default class InputMapSearch extends React.Component {
  handleSearch(e){
    this.places = this.searchBox.getPlaces();
    this.props.handleSearchResult(this.places);
  }
  componentDidMount(){
    this.searchBox = new window.google.maps.places.SearchBox(this.inputSearch);
    this.searchBox.addListener('places_changed', this.handleSearch.bind(this));
  }
  render(){
    return  <StyledInput className={"inputSearch " + this.props.className} ref={inputSearch => (this.inputSearch = inputSearch)} type="text" placeholder="write a search" />
  }
}
