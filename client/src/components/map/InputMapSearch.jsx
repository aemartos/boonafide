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
    return  <StyledInput className="inputSearch" ref={inputSearch => (this.inputSearch = inputSearch)} type="text" placeholder="write a search" />
  }
}
