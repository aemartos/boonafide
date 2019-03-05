import React, { Component } from "react";
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';

const StyledSelect = styled.div`
  position: relative;
  .icon {
    position: absolute;
    top: .7em;
    right: 1em;
    font-size: .8em;
    color: ${colors.midPurple};
    pointer-events: none;
    &:before {
      transform: rotate(90deg);
    }
  }
  select {
    width: 100%;
    padding: .4em .7em;
    margin-bottom: 1em;
    box-shadow: none;
    outline: 0;
    font-size: .9em;
    font-weight: 400;
    background: transparent;
    color: ${colors.midPurple};
    border: 1px solid ${colors.midPurple};
    border-radius: 5em;
  }
`;
export default class Select extends Component {
  handleOption(option) {
    this.props.onSelectOption(option);
  }

  render() {
    const { className, name, options } = this.props;
    return (
      <StyledSelect className={className}>
        <span className="icon b-arrow-short arrowMob" />
        <select defaultValue="" placeholder="Select categories" name={name} onChange={e => this.handleOption(e.target.value)}>
          <option value="" disabled hidden>Select categories</option>
          {options.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
        </select>
      </StyledSelect>
    );
  }
}
