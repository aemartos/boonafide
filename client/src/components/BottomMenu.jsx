import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { clearMessages } from '../lib/redux/actions';
import { colors } from '../lib/common/colors';
import styled from '@emotion/styled';

const BottomNav = styled.nav`
  height: 4.5em;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: ${props => props.is404 ? colors.purple : colors.grey};
  border-radius: 5em;
  box-shadow: 0px 10px 20px 10px rgba(0,0,0,0.33);
  z-index: 2;
  -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &.isClosed {
    bottom: -5em;
    -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav {
    width: 80%;
    margin: 1.3em auto 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: space-between;
    a {
      color: ${props => props.is404 ? colors.grey : colors.purple};
      margin-right: 1.2em;
      .icon {
        font-size: 1.7em;
        &.b-messages {
          font-size: 1.9em;
        }
        &.b-notifications, &.b-messages {
          position: relative;
          .notCircle {
            position: absolute;
            top: -.1em;
            right: -.2em;
            width: 1.5em;
            height: 1.5em;
            border-radius: 50%;
            color: #fff;
            background-color: ${colors.orange};
            font-size: .3em;
            line-height: 1em;
            padding: .2em 0;
            text-align: center;
          }
        }
      }
      &.active {
        color: ${colors.orange};
      }
      &:last-child {
        margin-right: 0;
      }
    }
    &.favorNav {
      margin: 1em auto 0;
      .icon {
        &.b-mp {
          font-size: 2em;
          &:before {
            margin-top: .15em;
          }
        }
        &.b-call {
          font-size: 2.2em;
        }
      }
    }
  }
`;

class _BottomMenu extends React.Component {
  render () {
    const {user, favor, dispatch, location, chat} = this.props;
    const numChat = chat.length;
    const numNot = user.notificationsId.filter(n => n.seen === false).length;
    //console.log(numNot);
    return (
      <BottomNav is404={location.pathname === '/not-found'} className={location.pathname.startsWith('/tickets') ? " isClosed" : ""}>
        {favor ?
          <div className="nav favorNav">
            <Link to={`/messages/${favor.userId}`}><span className="icon b-mp"></span></Link>
            <Link to=""><span className="icon b-call"></span></Link>
          </div>
        :
          <div className="nav">
            <NavLink exact to="/" onClick={()=> dispatch(clearMessages())}><span className="icon b-homem"></span></NavLink>
            <NavLink to="/philosophy" onClick={()=> dispatch(clearMessages())}><span className="icon b-philosophy"></span></NavLink>
            <NavLink to="/newFavor" onClick={()=> dispatch(clearMessages())}><span className="icon b-newfavor"></span></NavLink>
            <NavLink to="/messages" onClick={()=> dispatch(clearMessages())}><div className="icon b-messages">{numChat > 0 ? <div className="notCircle">{numChat}</div> : null} </div></NavLink>
            <NavLink to="/notifications" onClick={()=> dispatch(clearMessages())}><div className="icon b-notifications">{numNot > 0 ? <div className="notCircle">{numNot}</div> : null} </div></NavLink>
          </div>
        }
      </BottomNav>
    )
  }
};

export const BottomMenu = connect(store => ({user: store.user, favor: store.favor, chat: store.chat}))(_BottomMenu);
