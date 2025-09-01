import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3em;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;

const SwitchTrack = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid ${colors.darkGrey};
  border-radius: 25px;
  overflow: hidden;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;

const SwitchOption = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
  flex: ${(props) => (props.fullWidth ? 1 : 'none')};
  background-color: ${(props) => (props.active ? colors.purple : 'transparent')};
  color: ${(props) => (props.active ? 'white' : colors.darkGrey)};
  // border-right: ${(props) => (props.last ? 'none' : `1px solid ${colors.darkGrey}`)};
  border-radius: ${(props) => (props.active ? '24px' : '0')};
  
  &:hover {
    background-color: ${(props) => (props.active ? colors.purple : colors.lightGrey)};
    border-radius: 24px;
  }
  
  &:first-of-type {
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }
  
  &:last-of-type {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }
`;

function Switch({
  value, options, onChange, fullWidth = true,
}) {
  const handleOptionClick = (option) => {
    onChange(option);
  };

  return (
    <SwitchContainer fullWidth={fullWidth}>
      <SwitchTrack fullWidth={fullWidth}>
        {options.map((option, index) => (
          <SwitchOption
            key={option}
            active={value === option}
            last={index === options.length - 1}
            fullWidth={fullWidth}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </SwitchOption>
        ))}
      </SwitchTrack>
    </SwitchContainer>
  );
}

export default Switch;
