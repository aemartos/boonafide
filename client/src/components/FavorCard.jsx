import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import truncate from 'lodash/truncate';

const StyledCard = styled.div`
  width: ${props => props.slide ? '100%' : '48%'};
  background-color: ${colors.white};
  border: 1px solid ${colors.midGrey};
  border-radius: .5em;
  overflow: hidden;
  margin-bottom: ${props => props.slide ? '0' : '1em'};
  .text {
    width: 90%;
    margin: ${props => props.withBtns ? '.5em auto' : '.5em auto 1em'};
    .metadata {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      color: ${colors.darkGrey};
      font-size: .8em;
      font-weight: 100;
      a {
        color: ${colors.darkGrey};
        text-decoration: underline;
      }
    }
    .info {
      color: ${colors.purple};
      .name {
        margin-top: .6em;
        font-family: "Baloo Bhaina";
        line-height: 1em;
      }
      .description {
        font-size: .8em;
        font-weight: 100;
      }
    }
    .actions {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      margin: .5em auto 0;
      font-size: 1.8em;
      .b-mp {
        color: ${colors.green};
      }
      .b-heart {
        color: ${colors.orange};
      }
      .b-sharing {
        font-size: .9em;
        color: ${colors.purple};
      }
    }
  }
  img {
    width: 100%;
    height: 10em;
    object-fit: cover;
  }
`;

export const FavorCard = (props) => {
  const {img, username, date, name, description, withBtns, userId, slide} = props;
  return (
    <StyledCard slide={slide} withBtns={withBtns}>
      <img src={img} alt={name}></img>
      <div className="text">
        <div className="metadata">
          <Link to={`/profile/${userId}`}><span className="usermane">{username}</span></Link>
          <span className="date">{date}</span>
        </div>
        <div className="info">
          <p className="name">{slide ? truncate(name, {'length': 22}) : truncate(name, {'length': 18})}</p>
          <p className="description">{slide ? truncate(description, {'length': 63}) : truncate(description, {'length': 45})}</p>
        </div>
        {withBtns ?
          <div className="actions">
            <Link to=""><span className="b-mp"></span></Link>
            <Link to=""><span className="b-heart"></span></Link>
            <Link to=""><span className="b-sharing"></span></Link>
          </div>
          : null
        }
      </div>
    </StyledCard>
  );
};
