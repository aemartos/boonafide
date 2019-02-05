import React from "react";
import { HeartSpinner } from "react-spinners-kit";
import sample from 'lodash/sample';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { wQuotes } from '../lib/common/waitingQuotes';

const StyledSpinner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grey};
  .waiting-quote {
    width: 88%;
    margin: 0 auto;
    font-family: "Baloo Bhaina";
    font-size: 2em;
    line-height: 1.2em;
    color: ${colors.purple};
    p {
      width: 100%;
    }
  }
  .message {
    text-align: center;
    margin-bottom: 1em;
  }
  .author {
    text-align: right;
    opacity: .5;
    font-size: .6em;
    margin-bottom: .8em;
  }
`;

export const Spinner = () => {
  const quote = sample(wQuotes);
  return (
    <StyledSpinner>
      <div className="waiting-quote">
        <p className="author">_"{quote.author}"</p>
        <p className="message">"{quote.message}"</p>
      </div>
      <HeartSpinner size={50} color={colors.purple} loading={true}/>
    </StyledSpinner>
  );
}
