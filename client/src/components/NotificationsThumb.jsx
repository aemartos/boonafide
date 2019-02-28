import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { formatDateMin } from '../lib/common/helpers';
import { NotificationsAPI } from '../lib/API/notifications';

const StyledNotification = styled.div`
  margin: 1em 0;
  padding-bottom: 1em;
  border-bottom: 1px solid ${colors.darkGrey};
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  a {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    opacity: .4;
    &.noSeen {
      /* background-color: ${colors.midGrey}; */
      opacity: 1;
    }
    img {
      width: 3.5em;
      height: 3.5em;
      border-radius: 50%;
      border: 1px solid ${colors.darkGrey};
      object-fit: cover;
    }
    .info {
      width: 78%;
      color: ${colors.purple};
      /* display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-start; */
      .capitalize {
        text-transform: capitalize;
      }
      .bold {
        color: ${colors.orange};
        font-weight: 800;
      }
      .italic {
        font-style: italic;
      }
      .content {
        color: ${colors.purple};
        font-weight: 400;
        font-size: .8em;
        margin-bottom: 0;
      }
      .time {
        position: absolute;
        bottom: -1em;
        right: .5em;
        font-weight: 100;
        font-size: .7em;
        opacity: .5;
        text-align: right;
      }
    }
  }
`;

export default class NotificationsThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seen: this.props.notification.seen
    }
    this.createContent = this.createContent.bind(this);
  }
  handleClick(id) {
    NotificationsAPI.notificationSeen(id).then(()=>{}).catch(()=>{});
  }
  createContent(notification) {
    const {_id, type, createdAt, favorId, personId, receiverId, ticketId, helpedUsers} = notification;
    const {seen} = this.state;
    //console.log(helpedUsers % 3);
    switch(type) {
      case 'ticketValidated':
      return (
        <Link to="/profile" className={(seen ? "" : "noSeen ") + "notification"} onClick={()=>this.handleClick(_id)}>
          <img src={personId.pictureUrl} alt=""/>
          <div className="info">
          {helpedUsers < 3 ?
            <p className="content"> <span className="capitalize bold">{personId.username}</span> validated <span className="bold italic">"{favorId.name}"</span>. You only have to help {3 - helpedUsers} more people to get a boon.</p>
            :
            <p className="content"> <span className="capitalize bold">{personId.username}</span> validated <span className="bold italic">"{favorId.name}"</span>. Good job! You have helped 3 people, you can now redeem a boon!!!</p>
          }
            <p className="time">{formatDateMin(new Date(createdAt))}</p>
          </div>
        </Link>
      )
      case 'newTicket':
        return (
          <Link to={`/tickets/${ticketId._id}`} className={(seen ? "" : "noSeen ") + "notification"} onClick={()=>this.handleClick(_id)}>
            <img src={personId.pictureUrl} alt=""/>
            <div className="info">
            {favorId.type === "Offer" ?
              (receiverId._id.toString() === ticketId.donorId.toString() ?
                <p className="content"> <span className="capitalize bold">{personId.username}</span> has asked you for the favor: <span className="bold italic">"{favorId.name}"</span>. The ticket generated is available in your profile.</p>
              :
                <p className="content">You have requested <span className="capitalize bold">{personId.username}</span> for <span className="bold italic">"{favorId.name}"</span>. The ticket generated is available in your profile.</p>
              )
            :
              (receiverId._id.toString() === ticketId.donorId.toString() ?
                <p className="content">You have offered <span className="bold italic">"{favorId.name}"</span> to <span className="capitalize bold">{personId.username}</span>. The ticket generated is available in your profile.</p>
              :
                <p className="content"> <span className="capitalize bold">{personId.username}</span> has offered <span className="bold italic">"{favorId.name}"</span> to you. The ticket generated is available in your profile.</p>
              )
            }
              <p className="time">{formatDateMin(new Date(createdAt))}</p>
            </div>
          </Link>
        )
      case 'newMessage':
        return (
          <Link to={`/messages/${personId._id}`} className={(seen ? "" : "noSeen ") + "notification"} onClick={()=>this.handleClick(_id)}>
            <img src={personId.pictureUrl} alt=""/>
            <div className="info">
              <p className="content"><span className="capitalize bold">{personId.username}</span> contacted you.</p>
              <p className="time">{formatDateMin(new Date(createdAt))}</p>
            </div>
          </Link>
        )
      case 'favoriteFavor':
        return (
          <Link to={`/favors/${favorId._id}`} className={(seen ? "" : "noSeen ") + "notification"} onClick={()=>this.handleClick(_id)}>
            <img src={personId.pictureUrl} alt=""/>
            <div className="info">
              <p className="content"><span className="capitalize bold">{personId.username}</span> fav'd your favor: <span className="bold italic">"{favorId.name}".</span></p>
              <p className="time">{formatDateMin(new Date(createdAt))}</p>
            </div>
          </Link>
        )
      case 'commentInFavor':
        return (
          <Link to={`/favors/${favorId._id}`} className={(seen ? "" : "noSeen ") + "notification"} onClick={()=>this.handleClick(_id)}>
            <img src={personId.pictureUrl} alt=""/>
            <div className="info">
              <p className="content"><span className="capitalize bold">{personId.username}</span> commented on your favor: <span className="bold italic">"{favorId.name}".</span></p>
              <p className="time">{formatDateMin(new Date(createdAt))}</p>
            </div>
          </Link>
        )
      default:
        return;
    }
  }

  render () {
    const {notification} = this.props;
    return (
      <StyledNotification>
        {this.createContent(notification)}
      </StyledNotification>
    );
  }
};
