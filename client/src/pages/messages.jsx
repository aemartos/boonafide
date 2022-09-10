import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { MessagesAPI } from '../lib/API/messages';
import { ConverThumb } from '../components/ConverThumb';
import { colors } from '../lib/common/colors';

const StyledBox = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1em 0 6em;
  .noConversations {
    font-family: "Baloo Bhaina";
    font-size: 1.4em;
    line-height: 1.2em;
    color: ${colors.midPurple};
    padding: 2em .8em;
    text-align: center;
    @media (min-height: 700px) and (min-width: 415px) {
      font-size: 1.2em;
      padding: 1em 0;
    }
  }
`;
class _MessagesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  componentDidMount() {
    MessagesAPI.getConversations().then((conversations) => {
      this.setState({ conversations });
    });
  }

  render() {
    const { conversations } = this.state;
    const { user } = this.props;
    return (
      <div className="contentBox">
        <div className="container">
          <StyledBox>
            {conversations.length > 0
              ? conversations.map((c) => {
                const person = c.authorId.username === user.username ? c.receiverId : c.authorId;
                return <ConverThumb key={person._id} link={`/messages/${person._id}`} img={person.pictureUrl} name={person.username} content={c.lastSmsId.content} hour={c.lastSmsId.createdAt} />;
              })
              : <p className="noConversations">You have no active chats, go ahead and take the step to talk with someone :)</p>}
          </StyledBox>
        </div>
      </div>
    );
  }
}

export const MessagesPage = connect((store) => ({ user: store.user }))(_MessagesPage);
