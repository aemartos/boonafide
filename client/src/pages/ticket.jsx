import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import truncate from 'lodash/truncate';
import { setBusy } from '../lib/redux/actions';
import { colors } from '../lib/common/colors';
import { setMarker, formatDate } from '../lib/common/helpers';
import { TicketsAPI } from '../lib/API/tickets';
import { Button } from '../components/Button';
import Modal from '../components/Modal';
import { ValidationComponent } from '../components/ValidationComponent';
import MapComponent from '../components/map/MapComponent';

const StyledTicket = styled.div`
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${colors.black};
    opacity: .6;
    z-index: 1;
  }
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
        &.capitalize {
          text-transform: capitalize;
        }
      }
    }
  }
  .favorDescription {
    margin: 1.2em 0;
    padding-bottom: ${({ user, ticket }) => (user._id === ticket.donorId._id ? '1em' : '0')};
    border-bottom: ${({ user, ticket }) => (user._id === ticket.donorId._id ? `1px solid ${colors.darkGrey}` : '0')};
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
      .light {
        color: ${colors.midPurple};
      }
    }
    #map {
      height: ${(props) => (props.user._id === props.ticket.donorId._id ? '16.7em' : '13em')};
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
    @media (min-height: 700px) and (min-width: 415px) {
      .question {
        font-size: 1.4em;
      }
      .description , .instructions {
        font-size: .9em;
      }
    }
  }
`;
class _TicketDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: null,
      isVisible: false,
      validating: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(setBusy(true));
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    TicketsAPI.getTicket(id).then((ticket) => {
      this.props.dispatch(setBusy(false));
      this.setState({ ticket });
    }).catch(() => this.props.history.push('/not-found'));
  }

  handleModal(boolean) {
    this.setState({ isVisible: boolean });
  }

  handleValidate(boolean) {
    this.setState({ isVisible: false, validating: boolean });
  }

  render() {
    const { ticket, validating } = this.state;
    const { user } = this.props;
    return (
      <div className="contentBox">
        <div className="container">
          {ticket
            ? (
              <StyledTicket user={user} ticket={ticket}>
                {ticket.validated ? <div className="shadow" /> : null}
                <ValidationComponent ticket={ticket} validating={validating} closeValidation={(bool) => this.handleValidate(bool)} />
                <Modal isVisible={this.state.isVisible} bottom="35%">
                  <p className="question">Are you sure you want to validate your ticket?</p>
                  <p className="description">Remember you should validate your ticket when you are with the person is doing you the favor.</p>
                  <p className="instructions">Once a ticket is validated it can not be used again.</p>
                  <div className="actions">
                    <Button link="" onClick={() => this.handleModal(false)} className="btn btn-cancel">Cancel</Button>
                    <Button link="" onClick={() => this.handleValidate(true)} className="btn btn-confirm">Continue</Button>
                  </div>
                </Modal>
                <img src={ticket.favorId.pictureUrls[0]} alt={ticket.favorId.name} />
                <div className="info">
                  <p className="text donor">
                    Donor:
                    <span className="light capitalize">{ticket.donorId.username}</span>
                  </p>
                  <p className="text receiver">
                    Receiver:
                    <span className="light capitalize">{ticket.receiverId.username}</span>
                  </p>
                  <p className="text ticketId">
                    Ticket id:
                    <span className="light">{ticket._id}</span>
                  </p>
                  <p className="text date">
                    Date:
                    <span className="light">{formatDate(new Date(ticket.date))}</span>
                  </p>
                  <div className="favorDescription">
                    <p className="title">
                      <span className="name">{ticket.favorId.name}</span>
                      <Link to={`/favors/${ticket.favorId._id}`}><span className="icon b-arrow-short" /></Link>
                    </p>
                    <p className="description">{truncate(ticket.favorId.description, { length: 95 })}</p>
                  </div>
                </div>
                <div className="validation">
                  {user._id !== ticket.donorId._id
                    ? <Button link="" onClick={() => this.handleModal(true)} className={`${ticket.validated ? 'disable ' : ''}btn btn-primary`}>Validate ticket</Button>
                    : null}
                </div>
                <div className="mapLocation">
                  <p className="location">
                    Location:
                    <span className="light">{ticket.favorId.locationName}</span>
                  </p>
                  { (window.google)
                    ? (
                      <MapComponent
                        center={{ lat: ticket.favorId.location.coordinates[1], lng: ticket.favorId.location.coordinates[0] }}
                        setMap={(map) => {
                          this.mapObject = map;
                          this.marker = setMarker({ lat: ticket.favorId.location.coordinates[1], lng: ticket.favorId.location.coordinates[0] }, this.marker, this.mapObject, undefined, false);
                        }}
                      />
                    )
                    : <p className="noMap">Map can not be shown, sorry for the inconveniences</p>}
                </div>
              </StyledTicket>
            )
            : null}
        </div>
      </div>
    );
  }
}

export const TicketDetailPage = connect((store) => ({ user: store.user }))(withRouter(_TicketDetailPage));
