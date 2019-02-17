import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { formatDate } from '../lib/common/helpers';


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
      right: .5em;
      top: .5em;
      padding: .7em 1em .5em;
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
      }
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


export default class TicketThumb extends Component {
  constructor(props) {
    super(props);
    this.getLocationName = this.getLocationName.bind(this);
    this.state = {
      locationName:false
    }
  }

  componentDidMount(){
    const {location} = this.props;
    if (window.google) {
      this.getLocationName(location).then(e => this.setState({locationName:e}));
    }
  }

  getLocationName(coordinates) {
    const latlng = {lat: parseFloat(coordinates[1]), lng: parseFloat(coordinates[0])};
    this.geocoder = new window.google.maps.Geocoder();
    return new Promise(resolve=> this.geocoder.geocode({'location': latlng}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          resolve(results[0].formatted_address);
        } else {
          resolve("Unknown");
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    }));
  }

  render(){
    const {img, name, date, ticketId, validated} = this.props;
    return (
      <Link to={`/tickets/${ticketId}`}>
        <StyledThumb>
          <div className="dark" style={{display: validated ? "block" : "none"}}>
            <span className="finish">FINISH</span>
          </div>
          <img src={img} alt={name}/>
          <div className="info">
            <p className="title">{name}</p>
            {this.state.locationName ?
              <p className="location"> <span className="icon b-location"></span>{this.state.locationName}</p>
              :
              <p className="location">Loading location name</p>
            }
            <p className="date"> <span className="icon b-arrow-short"></span> {formatDate(new Date(date))}</p>
          </div>
        </StyledThumb>
      </Link>
    );
  }
};
