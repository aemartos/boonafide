import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { colors } from '../lib/common/colors';
import { formatDateMin } from '../lib/common/helpers';

const StyledComment = styled.div`
  margin: 1em 0;
  padding-bottom: 1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${colors.darkGrey};
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .info {
    width: 25%;
    color: ${colors.purple};
    margin: .05em .5em 0;
    .author {
      font-family: "Open Sans";
      font-weight: 800;
      font-size: .8em;
      a {
        color: ${colors.purple};
        text-decoration: underline;
      }
    }
    .date {
      font-family: "Open Sans";
      font-weight: 500;
      font-size: .6em;
    }
  }
  .content {
    font-weight: 100;
    width: 75%;
    font-size: .9em;
    margin-bottom: 0;
    /* word-break: break-all; */
  }
`;

export function CommentDetail(props) {
  const { content, author, date } = props;
  return (
    <StyledComment>
      <div className="info">
        <p className="author"><Link to={`/profile/${author._id}`}>{author.username}</Link></p>
        <p className="date">{formatDateMin(new Date(date))}</p>
      </div>
      <div className="content">{content}</div>
    </StyledComment>
  );
}
