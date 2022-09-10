import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import truncate from 'lodash/truncate';
import { colors } from '../lib/common/colors';

const StyledThumb = styled.div`
  margin: 1em 0;
  padding-bottom: 1em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.darkGrey};
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  img {
    width: 3.5em;
    height: 3.5em;
    border-radius: 50%;
    border: 1px solid ${colors.darkGrey};
    object-fit: cover;
    margin-right: .7em;
  }
  .info {
    width: 70%;
    color: ${colors.purple};
    .title {
      font-family: "Baloo Bhaina";
      line-height: 1em;
    }
    .description {
      font-weight: 100;
      font-size: .9em;
      margin-bottom: 0;
    }
  }
  a {
    span {
      color: ${colors.purple};
      font-size: 1.7em;
      &:before {
        margin-top: .3em;
      }
    }
  }
`;

export function FavorThumb(props) {
  const {
    img, name, description, favorId,
  } = props;
  return (
    <StyledThumb>
      <img src={img} alt={name} />
      <div className="info">
        <p className="title">{name}</p>
        <p className="description">{truncate(description, { length: 60 })}</p>
      </div>
      <Link to={`/favors/${favorId}`}><span className="b-arrow" /></Link>
    </StyledThumb>
  );
}
