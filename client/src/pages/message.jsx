import React from 'react';
import styled from '@emotion/styled';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MessagesAPI }  from '../lib/API/messages';
import FormField from '../components/FormField';
import { colors } from '../lib/common/colors';
import { getTime } from '../lib/common/helpers';

const Receiver = styled.p`
  position: absolute;
  top: 2em;
  left: 50%;
  transform: translateX(-50%);
  color: ${colors.grey};
  text-transform: capitalize;
  font-family: "Baloo Bhaina";
  font-size: 1.3em;
  line-height: 1em;
  z-index: 3;
`;

const SendBox = styled.div`
  width: 95%;
  margin: 0 auto;
  position: relative;
  /* display: flex; */
  /* flex-flow: row nowrap; */
  /* justify-content: space-between; */
  /* align-items: center; */
  input {
    width: 90% !important;
  }
  .icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2.8em;
    color: ${colors.purple};
    &:before {
      /* margin-top: .25em; */
    }
  }
`;

const MessagesBox = styled.div`
  width: 95%;
  height: 84%;
  margin: 0 auto;
  padding: 0 .5em;
  overflow-Y: auto;
  display: flex;
  flex-flow: column nowrap;
  .moreSmss {
    text-align: center;
    font-size: .8em;
    text-decoration: underline;
    color: ${colors.midPurple};
    padding-top: .5em;
  }
  .noMessages {
    font-family: "Baloo Bhaina";
    font-size: 1.5em;
    line-height: 1.2em;
    color: ${colors.midPurple};
    padding: 2em 1em;
    text-align: center;
    .receiver {
      text-transform: capitalize;
    }
  }
`;

const Message = styled.div`
  padding: .6em 1em;
  border-radius: .3em;
  margin-top: .5em;
  max-width: 80%;
  font-size: .8em;
  position: relative;
  .content {
    padding-bottom: .8em;
  }
  .date {
    position: absolute;
    bottom: .5em;
    right: .7em;
    font-size: .6em;
    opacity: .7;
  }
  &:first-of-type {
    margin-top: 1em;
  }
  &:last-child {
    margin-bottom: 1em;
  }
  &.me {
    color: ${colors.darkGrey};
    background-color: ${colors.purple};
    align-self: flex-end;
    &:after {
      right: -.6em;
      background: url('/images/meSMS_ballon.png');
    }
  }
  &.other {
    color: ${colors.purple};
    background-color: ${colors.white};
    align-self: flex-start;
    &:after {
      left: -.6em;
      background: url('/images/otherSMS_ballon.png');
    }
  }
  &.me, &.other {
    &:after {
      position: absolute;
      bottom: 0;
      content: '';
      display: block;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 1.1em;
      height: .8em;
    }
  }
`

class _Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      messages: [],
      moreSms: true,
      receiver: {}
    }
    let authorId = this.props.user._id;
    let receiverId = this.props.match.params.id;
    this.room = authorId < receiverId ? authorId + '_' + receiverId : receiverId + '_' + authorId;
  }

  handleSend() {
    const {content} = this.state;
    this.setState({content: ""});
    if(content === "") return;
    this.socket.emit('sms_sent', {room: this.room, authorIdMsg: this.props.user._id, receiverIdMsg: this.props.match.params.id, content});
  }
  bottomScroll() {
    const msgBox = document.getElementById('messagesBox');
    msgBox.scrollTop = msgBox.scrollHeight;
  }
  handleMoreSmss() {
    MessagesAPI.moreMessages(this.props.match.params.id, this.state.messages.length).then(res => {
      this.setState({moreSms: res.messages.length === 30, messages:[...res.messages,...this.state.messages]});
    });
  }
  componentDidMount(){
    let receiverId = this.props.match.params.id;
    MessagesAPI.getMessages(receiverId).then(res => {
      this.setState({receiver: [res.receiver]})
      this.socket = io('http://localhost:3001/');
      this.socket.on('connect', (data) => {});
      this.socket.on('sms_received', (data) => {
        this.setState({messages: [...this.state.messages, data]})
        if(data.receiverId !== this.props.user._id) this.bottomScroll();
      });
      this.socket.on('disconnect', function(data){});
      this.socket.emit('subscribe', {room: this.room})
      this.setState(res);
    })
  }
  componentDidUpdate() {
    if(this.state.messages.length <= 30) {
      this.bottomScroll();
    }
  }
  componentWillUnmount() {
    this.socket.disconnect();
    MessagesAPI.disconnect();
  }

  render() {
    const {user} = this.props;
    const {messages, receiver, moreSms} = this.state;
    return(
      <div className="contentBox">
        <div className="container">
          <Receiver>{receiver.username}</Receiver>
          <MessagesBox id="messagesBox">
            {(messages.length >= 30 && moreSms) ? <p className="moreSmss" onClick={()=>this.handleMoreSmss()}>show more</p> : null}
            {messages.length > 0 ?
              messages.map((m,i) => {
                let smsClass = user._id === m.authorId ? 'me' : 'other';
                return (<Message key={i} className={smsClass}>
                  <p className="content">{m.content}</p>
                  <p className="date">{getTime(new Date(m.createdAt))}</p>
                </Message>);
              })
            : <p className="noMessages">You have no messages with <span className="receiver">{receiver.username}</span>, go ahead and say something :)</p>
            }
          </MessagesBox>
          <SendBox>
            <FormField clas="line" type="text" placeholder={`write a message to ${receiver.username}`} onChange={e => this.setState({content: e.target.value})} value={this.state.content} onKeyUp={(e)=>{if (e.keyCode === 13) {this.handleSend()}}}/>
            <button onClick={()=> this.handleSend()}><span className="icon b-arrow-fill"></span></button>
          </SendBox>
        </div>
      </div>
    )
  }
};

export const Chat = connect(store => ({user: store.user}))(withRouter(_Chat));
