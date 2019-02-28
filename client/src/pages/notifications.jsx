import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationsAPI }  from '../lib/API/notifications';
import NotificationsThumb from '../components/NotificationsThumb';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';

const NotificationsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1em 0 6em;
  .noNotifications {
    font-family: "Baloo Bhaina";
    font-size: 1.4em;
    line-height: 1.2em;
    color: ${colors.midPurple};
    padding: 2em 0;
    text-align: center;
    @media (min-height: 700px) and (min-width: 415px) {
      font-size: 1.2em;
      padding: 1em 0;
    }
  }
`;
class _NotificationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
  }
  componentDidMount() {
    NotificationsAPI.getNotifications().then(notifications => this.setState({notifications})).catch(()=>{});
  }
  render() {
    const notifications = this.state.notifications;
    //const notifications = [...this.props.user.notificationsId].reverse();
    //console.log(notifications)
    return (
      <div className="contentBox">
        <div className="container">
        <NotificationsContainer>
          {notifications.length > 0 ?
            notifications.map(n => <NotificationsThumb key={n._id} notification={n}/>)
          : <p className="noNotifications">You have no notifications yet :)</p>}
        </NotificationsContainer>
        </div>
      </div>
    );
  }
}

export const NotificationsPage = connect(store => ({user: store.user}))(_NotificationsPage);
