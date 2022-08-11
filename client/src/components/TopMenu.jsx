import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthAPI } from '../lib/API/auth';
import { logout, clearMessages /* setBusy */ } from '../lib/redux/actions';
import { updateUser } from '../lib/redux/actions';
import { FavorsAPI } from '../lib/API/favors';
import { colors } from '../lib/common/colors';

const TopNav = styled.nav`
  height: 5em;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.purple};
  box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.33);
  z-index: 2;
  .pathName {
    font-family: "Baloo Bhaina";
    font-size: 1.3em;
    color: ${colors.grey};
    margin-top: 1.3em;
    text-transform: capitalize;
  }
  a, .icon, .logout {
    color: ${colors.grey};
    cursor: pointer;
    &.btn {
      font-size: 1.6em;
      margin: 1em 0 0 1em;
    }
    &.btn-arrow {
      margin: 1.3em 0 0 2em;
      font-size: 1em;
      &:before{
        transform: rotate(180deg);
      }
    }
    &.profile-pic {
      width: 3em;
      height: 3em;
      margin: 1em 1em 0 0;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 3em;
        object-fit: cover;
      }
    }
  }
  .favMenu {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    color: ${colors.grey};
    margin: 1.5em 2em 0 1em;
    .b-heart, .b-heart-fill {
      font-size: 1.6em;
      margin-right: .6em;
      &.active {
        animation-name: rubberBand;
        animation-duration: 0.5s;
        -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
    .b-sharing {
      font-size: 1.5em;
      margin-right: .6em;
    }
    .threeDots {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      .dot {
        width: .25em;
        height: .25em;
        border-radius: .2em;
        margin-left: .5em;
        margin-bottom: .25em;
        background-color: ${colors.grey};
      }
    }
  }
  @keyframes rubberBand {
    from {transform: scale3d(1, 1, 1);}
    30% {transform: scale3d(1.25, 0.75, 1);}
    40% {transform: scale3d(0.75, 1.25, 1);}
    50% {transform: scale3d(1.15, 0.85, 1);}
    65% {transform: scale3d(0.95, 1.05, 1);}
    75% {transform: scale3d(1.05, 0.95, 1);}
    to {transform: scale3d(1, 1, 1);}
  }
`;

class _TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.user.favFavs.indexOf(this.props.favorId) !== -1,
    };
  }

  handleFav(id) {
    FavorsAPI.favFavor(id).then(() => {
      this.setState({ isFavorite: !this.state.isFavorite });
      AuthAPI.currentUser().then((user) => {
        this.props.dispatch(updateUser(user));
      });
    });
  }

  render() {
    const { user, favor, dispatch, location, history } = this.props;
    const { isFavorite } = this.state;
    return (
      <TopNav>
        {location.pathname.startsWith('/tickets') || location.pathname.match(/\/messages\/.+/) || location.pathname.match(/\/favors\/.+/)
          ? (
            <React.Fragment>
              <span className="icon btn-arrow b-arrow-short" onClick={() => history.goBack()} />
              {location.pathname.startsWith('/tickets') ? <span className="pathName">{location.pathname.split('/')[1]}</span> : null }
            </React.Fragment>
          )
          : (
            <span className="logout btn" onClick={() => AuthAPI.logout().then(() => dispatch(logout())).catch(() => { /* dispatch(setBusy(false)) */ })}>
              <span className="icon b-logout" />
            </span>
          )
        }
        {favor
          ? (
            <div className="favMenu">
              <span className={ isFavorite ? "icon b-heart-fill active" : "icon b-heart"} onClick={() => this.handleFav(favor._id) } />
              <span className="icon b-sharing" />
              <div className="threeDots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            </div>
          )
          : (
            <NavLink className="profile-pic" to="/profile" onClick={() => dispatch(clearMessages())}>
              {' '}
              <img src={user.pictureUrl} alt={`${user.name} profile`} />
            </NavLink>
          )}
      </TopNav>
    );
  }
}

export const TopMenu = connect(store => ({ user: store.user, favor: store.favor }))(_TopMenu);
