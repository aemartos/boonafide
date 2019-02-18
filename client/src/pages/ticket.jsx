import React, { Component } from 'react';
import { setBusy } from '../lib/redux/actions';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { setMarker, formatDate } from '../lib/common/helpers';
import { TicketsAPI } from '../lib/API/tickets';
import truncate from 'lodash/truncate';
import { Button } from '../components/Button';
import Modal from '../components/Modal';
import MapComponent from '../components/map/MapComponent';
import { Link } from 'react-router-dom';


const StyledTicket = styled.div`
  /* width: 90%; */
  /* margin: 2em auto 6em; */
  img {
    width: 100%;
    height: 10em;
    object-fit: cover;
  }
  .info, .validation {
    width: 90%;
    margin: 1em auto;
  }
  .info {
    color: ${colors.purple};
    font-family: "Baloo Bhaina";
    line-height: 1em;
    .text {
      padding: .5em 0 .7em;
      margin-bottom: .5em;
      border-bottom: 1px solid ${colors.darkGrey};
      .light {
        color: ${colors.midPurple};
      }
    }
  }
  .favorDescription {
    margin: 1.2em 0;
    .title {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 1.3em;
        margin-bottom: .2em;
      }
      .icon {
        color: ${colors.purple};
      }
    }
    .description {
      font-family: "Open Sans";
      font-size: .9em;
    }
  }
  .mapLocation {
    .location {
      width: 90%;
      margin: 1em auto .5em;
      color: ${colors.purple};
      font-family: "Baloo Bhaina";
      line-height: 1em;
    }
    #map {
      height: 13em;
      background-color: ${colors.midGrey}
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
`;
class _TicketDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: null,
      isVisible: false
    }
  }

  handleModal() {
    this.setState({isVisible: !this.state.isVisible});
  }

  handleValidate() {
    this.setState({isVisible: !this.state.isVisible});
  }

  componentWillMount(){
    this.props.dispatch(setBusy(true));
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    TicketsAPI.getTicket(id).then(ticket => {
      this.props.dispatch(setBusy(false));
      this.setState({ticket});
      }).catch(e => this.props.history.push('/not-found'));
  }

  render() {
    const {ticket} = this.state;
    return (
      <div className="contentBox">
        <div className="container">
          {ticket ?
            <StyledTicket>
              <Modal isVisible={this.state.isVisible}>
                {/* <span className="icon b-cross" onClick={()=> this.handleModal()}></span> */}
                <p className="question">Are you sure you want to validate your ticket?</p>
                <p className="description">Remember you should validate your ticket when you are with the person is doing you the favor.</p>
                <p className="instructions">Once a ticket is validated it can not be used again.</p>
                <div className="actions">
                  <Button link="" onClick={()=> this.handleModal()} className="btn btn-cancel">Cancel</Button>
                  <Button link="" onClick={()=> this.handleValidate()} className="btn btn-confirm">Continue</Button>
                </div>
              </Modal>
              <img src={ticket.favorId.picturesUrls[0]} alt={ticket.favorId.name}/>
              <div className="info">
                <p className="text donor">Offer by: <span className="light">{ticket.donorId.username}</span></p>
                <p className="text receiver">Request by: <span className="light">{ticket.receiverId.username}</span></p>
                <p className="text ticketId">Ticket id: <span className="light">{ticket._id}</span></p>
                <p className="text date">Date: <span className="light">{formatDate(new Date(ticket.date))}</span></p>
                <div className="favorDescription">
                  <p className="title"><span className="name">{ticket.favorId.name}</span> <Link to={`/favors/${ticket.favorId}`}><span className="icon b-arrow-short"></span></Link></p>
                  <p className="description">{truncate(ticket.favorId.description, {'length': 95})}</p>
                </div>
              </div>
              <div className="validation">
                <Button link="" onClick={()=> this.handleModal()} className="btn btn-primary">Validate ticket</Button>
              </div>
              <div className="mapLocation">
                <p className="location">Location</p>
                { (window.google) ?
                  <MapComponent center={{lat: ticket.favorId.location.coordinates[1], lng: ticket.favorId.location.coordinates[0]}} setMap={(map)=>{
                    this.mapObject = map;
                    this.marker = setMarker({lat: ticket.favorId.location.coordinates[1], lng: ticket.favorId.location.coordinates[0]}, this.marker, this.mapObject, undefined, false);
                  }}/>
                  : <p className="noMap">Map can not be shown, sorry for the inconveniences</p>
                }
              </div>
            </StyledTicket>
            : null
          }
        </div>
      </div>
    );
  }
}

export const TicketDetailPage = withRouter(_TicketDetailPage);
