import React, { Component } from 'react';
import { updateUser, setBusy, setFavor } from '../lib/redux/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { setMarker, getCompleteDate } from '../lib/common/helpers';
import { FavorsAPI } from '../lib/API/favors';
import { TicketsAPI } from '../lib/API/tickets';
import { AuthAPI } from '../lib/API/auth';
import truncate from 'lodash/truncate';
import { Button } from '../components/Button';
import Modal from '../components/Modal';
import MapComponent from '../components/map/MapComponent';
import moment from 'moment';

const StyledFavor = styled.div`
  position: relative;
  padding-bottom: ${props => props.user._id === props.favor.creatorId._id ? "0" : "4.5em"};
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${colors.black};
    opacity: .6;
    z-index: 3;
  }
  img {
    width: 100%;
    height: 20em;
    object-fit: cover;
  }
  .info, .request {
    width: 90%;
    margin: 1em auto;
  }
  .info {
    color: ${colors.purple};
    font-family: "Baloo Bhaina";
    line-height: 1em;
    .text {
      margin: .3em 0;
      /* margin-bottom: .5em; */
      .light {
        color: ${colors.midPurple};
        &.capitalize {
          text-transform: capitalize;
        }
      }
    }
  }
  .favorDescription {
    padding-bottom: 1em;
    margin: 1.2em 0;
    border-bottom: 1px solid ${colors.darkGrey};
    .title {
      font-size: 1.3em;
      margin-bottom: .2em;
    }
    .description {
      font-family: "Open Sans";
      font-size: .9em;
    }
  }
  .dateHourBox {
    color: ${colors.purple};
    font-family: "Baloo Bhaina";
    line-height: 1em;
    .dateHour {
      width: 90%;
      margin: 1em auto;
      font-size: 1.2em;
    }
    .days, .hours {
      .slick-slide {
        &.slick-current {
          color: ${colors.midGrey};
          background-color: ${colors.purple};
        }
        &:nth-last-of-type(-n+2) {
          display: none;
        }
      }
    }
    .days {
      height: 5em;
      background-color: ${colors.midGrey};
      text-align: center;
      .slick-slide {
        width: 30%;
        height: 5em;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        .day {
          padding: 0 .5em;
        }
      }
    }
    .hours {
      margin-top: 1em;
      text-align: center;
      height: 5em;
      .slick-slide {
        background-color: ${colors.midGrey};
        border-radius: 50%;
        height: 5em;
        width: 5em !important;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        margin: 0 .4em;
      }
    }
  }
  .mapLocation {
    .location {
      width: 90%;
      margin: 2em auto 1em;
      padding-top: 1.5em;
      border-top: 1px solid ${colors.darkGrey};
      color: ${colors.purple};
      font-family: "Baloo Bhaina";
      line-height: 1em;
      .light {
        color: ${colors.midPurple};
      }
    }
    #map {
      height: ${props => props.user._id === props.favor.creatorId._id ? "16.7em" : "13em"};
      background-color: ${colors.midGrey};
    }
  }
  .modal {
    color: ${colors.purple};
    text-align: center;
    .question {
      font-family: "Baloo Bhaina";
      font-size: 1.5em;
      line-height: 1em;
    }
    .description , .instructions {
      font-weight: 100;
      margin-top: 1em;
    }
    .icon {
      position: absolute;
      top: .5em;
      right: .5em;
      color: ${colors.orange};
    }
    .actions {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      > * {
        width: 48%;
      }
    }
  }
  .sliderImg {
    position: relative;
    .remFavs {
      position: absolute;
      bottom: .7em;
      right: .7em;
      width: 2em;
      height: 2em;
      color: ${colors.midGrey};
      font-size: 1.7em;
      line-height: 2.1em;
      text-align: center;
      font-family: "Baloo Bhaina";
      border-radius: 50%;
      border: 3px solid ${colors.midGrey};
      z-index: 1;
    }
    .slick-dots {
      bottom: 20px;
    }
  }
`;
class _FavorDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favor: null,
      boonsReceiver: undefined,
      donorId: null,
      receiverId: null,
      isVisible: false,
      selectedDay: null,
      selectedHour: null
    }
  }
  handleModal() {
    this.setState({isVisible: !this.state.isVisible});
  }

  handleFavorRequest() {
    const {favor, donorId, receiverId, selectedDay, selectedHour} = this.state;
    this.setState({isVisible: !this.state.isVisible});
    const formatDate = selectedDay.slice(6) + "-" + selectedDay.slice(3, 5) + "-" + selectedDay.slice(0, 2) + ", " + selectedHour;
    const ticket = {
      date: new Date(formatDate),
      donorId,
      receiverId,
      favorId: favor._id
    }
    //console.log(ticket);
    TicketsAPI.newTicket(ticket).then((res)=>{
      AuthAPI.currentUser()
        .then(user => {
          this.props.dispatch(updateUser(user));
          this.props.history.push(`/tickets/${res._id}`);
        })
    })
    .catch(e=> {
      console.log(e);
      this.props.dispatch(setBusy(false))
      this.setState({showError: e.data})
    });
  }
  componentWillMount(){
    this.props.dispatch(setBusy(true));
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    const {user} = this.props;
    FavorsAPI.getFavor(id).then(favor => {
      const donorId = favor.type === "Offer" ? favor.creatorId._id : user._id;
      const receiverId = favor.type === "Offer" ? user._id : favor.creatorId._id;
      const boonsReceiver = favor.type === "Offer" ? user.boons.length : favor.creatorId.boons.length;
      let selectedDay = Object.keys(favor.shifts)[0];
      this.props.dispatch(setFavor(favor));
      this.setState({favor, boonsReceiver, donorId, receiverId, selectedDay, selectedHour: favor.shifts[selectedDay][0]});
    }).catch(e => this.props.history.push('/not-found'));
  }
  componentWillUnmount() {
    this.props.dispatch(setFavor(undefined));
  }
  render() {
    const {favor, selectedDay, boonsReceiver} = this.state;
    const {user} = this.props;
    const settingsImg = {
      dots: true,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const settingsDays = {
      dots: false,
      arrows: false,
      infinite: false,
      slidesToShow: (favor && Object.keys(favor.shifts).length > 2) ? 3 : 1,
      focusOnSelect: true,
      centerMode: true,
      slidesToScroll: 1,
      afterChange: idx => this.setState({selectedDay: Object.keys(favor.shifts)[idx]})
    };
    const settingsHours = {
      dots: false,
      arrows: false,
      infinite: false,
      slidesToShow: (favor && favor.shifts[selectedDay].length > 2) ? 3 : 1,
      focusOnSelect: true,
      centerMode: true,
      slidesToScroll: 1,
      afterChange: idx => this.setState({selectedHour: favor.shifts[selectedDay][idx]})
    };
    return (
      <div className="contentBox">
        <div className="container">
        {favor ?
          <StyledFavor user={user} favor={favor}>
            {favor.remainingFavNum < 1 ? <div className="shadow"></div> : null}
            <Modal isVisible={this.state.isVisible}>
              <p className="question">Are you sure you want to {favor.type === "Need" ? "offer" : "request"} the favor?</p>
              <p className="description">Remember if you {favor.type === "Need" ? "offer the favor, no boon will be removed from the user" : "request the favor, a boon will be removed from your account when the ticket will be validated."}</p>
              <p className="instructions">Once a favor is set it can not be removed.</p>
              <div className="actions">
                <Button link="" onClick={()=> this.handleModal()} className="btn btn-cancel">Cancel</Button>
                <Button link="" onClick={()=> this.handleFavorRequest()} className="btn btn-confirm">Continue</Button>
              </div>
            </Modal>
            <div className="sliderImg">
              <p className="remFavs">{favor.remainingFavNum}</p>
              <Slider {...settingsImg}>
                {favor.pictureUrls.map((img, i) => <img key={i} src={img} alt={favor.name}/>)}
              </Slider>
            </div>
            <div className="info">
              <p className="text creator">{favor.type === "Offer" ? "Offer " : "Request "}by: <span className="light capitalize">{favor.creatorId.username}</span></p>
              <p className="text remainingFavors">Remaining favors: <span className="light">{favor.remainingFavNum}</span></p>
              <div className="favorDescription">
                <p className="title">{favor.name}</p>
                <p className="description">{truncate(favor.description, {'length': 193})}</p>
              </div>
            </div>
            <div className="dateHourBox">
              <p className="text dateHour">Select day and hour</p>
              <Slider {...settingsDays} className="days">
                {Object.keys(favor.shifts).map((day, i) => <p key={i}className="day">{getCompleteDate(moment(day, "DD-MM-YYYY").toDate())}</p>)}
                <p className="day"></p>
                <p className="day"></p>
              </Slider>
              <Slider {...settingsHours} className="hours">
                {favor.shifts[selectedDay].map((hour, i) => <p key={i}className="hour">{hour}</p>)}
                <p className="hour"></p>
                <p className="hour"></p>
              </Slider>
            </div>
            <div className="mapLocation">
              <p className="location">Location: <span className="light">{favor.locationName}</span></p>
              { (window.google) ?
                <MapComponent center={{lat: favor.location.coordinates[1], lng: favor.location.coordinates[0]}} setMap={(map)=>{
                  this.mapObject = map;
                  this.marker = setMarker({lat: favor.location.coordinates[1], lng: favor.location.coordinates[0]}, this.marker, this.mapObject, undefined, false);
                }}/>
                : <p className="noMap">Map can not be shown, sorry for the inconveniences</p>
              }
            </div>
            <div className="request">
              {user._id !== favor.creatorId._id || favor.remainingFavNum < 1 ?
                <Button link="" onClick={()=> this.handleModal()} className={(boonsReceiver <= 0 ? "disable " : "") + "btn btn-primary"}>{favor.type === "Offer" ? "Request " : "Offer"} favor</Button>
              : null}
            </div>
          </StyledFavor>
        : null}
        </div>
      </div>
    );
  }
}

export const FavorDetailPage = connect(store => ({user: store.user}))(withRouter(_FavorDetailPage));
