import React from 'react';
import { URL_SERVER } from '../lib/common/constants';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { newNotification, newChat } from '../lib/redux/actions';

class _Sockets extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return null;
  }

  componentWillUnmount() {
    window.socket.disconnect();
    clearInterval(this.ping);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.user && this.props.user) {
      let {user} = this.props;

      window.socket = io(`${URL_SERVER}/`);
      window.socket.on('connect', (data) => {
        window.socket.emit('register', {author: user._id.toString(), token: user.token});
      });
      this.ping = setInterval(()=> window.socket.emit('ping'), 2000);
      window.socket.on('pong', () => {});
      window.socket.on('sms_received', (data) => {
        if (data.authorId.toString() !==  user._id.toString()) {
          if (!window.location.href.match(/\/messages\/.+/)){
            this.props.dispatch(newChat(data));
          }
        }
      });
      window.socket.on('notification', (data) => {
        this.props.dispatch(newNotification(data.notification));
      });
    }
  }

}

export const Sockets = connect(store => ({user: store.user, chat: store.chat}))(_Sockets);
