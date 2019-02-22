import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { formatDate } from '../lib/common/helpers';
import truncate from 'lodash/truncate';

const StyledThumb = styled.div`
  position: relative;
  margin: 1em 0;
  height: 11em;
  margin-bottom: 1em;
  background-color: ${colors.white};
  border-radius: .5em;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  .dark {
    position: absolute;
    top: 0;
    width: 100%;
    height: 11em;
    background-color: rgba(0,0,0,.5);
    .finish {
      position: absolute;
      right: .7em;
      top: .7em;
      padding: .6em 1em .4em;
      background-color: ${colors.white};
      border-radius: .5em;
      font-family: "Baloo Bhaina";
      line-height: 1em;
      color: ${colors.purple};
    }
  }
  img {
    width: 100%;
    height: 50%;
    object-fit: cover;
  }
  .info {
    padding: 1em;
    color: ${colors.purple};
    .title {
      font-family: "Baloo Bhaina";
      line-height: 1em;
    }
    .location, .date {
      font-weight: 100;
      font-size: .8em;
      margin-bottom: 0;
      .icon {
        font-size: .8em;
        opacity: .5;
        margin-right: .5em;
        &.b-philosophy {
          font-size: .8em;
        }
      }
    }
  }
`;


export default class TicketThumb extends Component {

  render(){
    const {img, name, date, ticketId, validated, location} = this.props;
    return (
      <Link to={`/tickets/${ticketId}`}>
        <StyledThumb>
          <div className="dark" style={{display: validated ? "block" : "none"}}>
            <span className="finish">FINISH</span>
          </div>
          <img src={img} alt={name}/>
          <div className="info">
            <p className="title">{name}</p>
            <p className="location"> <span className="icon b-location"></span>{truncate(location, {'length': 45})}</p>
            <p className="date"><span className="icon b-philosophy"></span>{formatDate(new Date(date))}</p>
          </div>
        </StyledThumb>
      </Link>
    );
  }
};
