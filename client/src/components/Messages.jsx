import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
// import { clearMessages } from '../lib/redux/actions';
import { colors } from '../lib/common/colors';

const Message = styled.div`
  text-align: center;
  font-size: .8em;
  color: ${colors.grey};
  opacity: .5;
  padding-top: .5em;
`;

function InternalMessages({
  messages,
  // dispatch,
}) {
  return (
    <div style={{ height: '1em' }}>
      {messages.map((m, i) => (
        <Message key={i}>
          {m}
          {/* <span onClick={() => dispatch(clearMessages())}> x</span> */}
        </Message>
      ))}
    </div>
  );
}

export const Messages = connect((state) => ({ messages: state.messages }))(InternalMessages);
