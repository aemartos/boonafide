import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../lib/redux/actions';
import { FavorsAPI } from '../lib/API/favors';
import { AuthAPI } from '../lib/API/auth';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import truncate from 'lodash/truncate';

const StyledCard = styled.div`
  position: relative;
  width: ${props => props.slide ? '100%' : '48%'};
  background-color: ${colors.white};
  border: 1px solid ${colors.midGrey};
  border-radius: .5em;
  overflow: hidden;
  margin-bottom: ${props => props.slide ? '0' : '1em'};
  .typeFav {
    position: absolute;
    right: .7em;
    top: .7em;
    padding: .6em 1em .4em;
    background-color: ${colors.white};
    border-radius: .5em;
    font-family: "Baloo Bhaina";
    line-height: 1em;
    color: ${colors.purple};
  }
  .text {
    width: 90%;
    height: ${props => props.withBtns ? "7.5em" : "4.7em"};
    margin: ${props => props.withBtns ? '.5em auto' : '.5em auto 1em'};
    .metadata {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      color: ${colors.darkGrey};
      font-size: .8em;
      font-weight: 100;
      a {
        color: ${colors.darkGrey};
        text-decoration: underline;
      }
    }
    .info {
      color: ${colors.purple};
      .name {
        margin-top: .6em;
        font-family: "Baloo Bhaina";
        font-size: .9em;
        line-height: 1em;
      }
      .description {
        font-size: .7em;
        font-weight: 100;
      }
    }
    .actions {
      position: absolute;
      bottom: .3em;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      width: 80%;
      margin: .5em auto 0;
      font-size: 1.8em;
      .b-mp {
        color: ${colors.green};
      }
      .b-heart, .b-heart-fill {
        color: ${colors.orange};
        -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        &.active {
          animation-name: rubberBand;
          animation-duration: 0.5s;
          -webkit-transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
      .b-sharing {
        font-size: .9em;
        color: ${colors.purple};
      }
    }
  }
  img {
    width: 100%;
    height: 10em;
    object-fit: cover;
  }
  @keyframes big {
    0% {transform: scale(1,1);}
    10% {transform: scale(1.1,1.1);}
    20% {transform: scale(1.4,1.4);}
    50% {transform: scale(1.2,1.2);}
    80% {transform: scale(1.4,1.4);}
    90% {transform: scale(1.1,1.1);}
    100% {transform: scale(1,1);}
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
  @keyframes tada {
    from {transform: scale3d(1, 1, 1);}
    10%,20% {transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);}
    30%,50%,70%,90% {transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);}
    40%,60%,80% {transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);}
    to {transform: scale3d(1, 1, 1);}
  }
`;


class _FavorCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.user.favFavs.indexOf(this.props.favorId) !== -1
    }
  }
  handleFav(id) {
    FavorsAPI.favFavor(id).then(() => {
      this.setState({isFavorite: !this.state.isFavorite});
      AuthAPI.currentUser().then(user => {
        this.props.dispatch(updateUser(user));
      });
    });
  }
  render() {
    const {type, img, username, date, name, description, withBtns, userId, favorId, slide} = this.props;
    const {isFavorite} = this.state;
    return (
      <StyledCard slide={slide} withBtns={withBtns}>
        <span className="typeFav">{type}</span>
        <img src={img} alt={name}></img>
        <div className="text">
          <div className="metadata">
            <Link to={`/profile/${userId}`}><span className="usermane">{username}</span></Link>
            <span className="date">{date}</span>
          </div>
          <Link to={`/favors/${favorId}`}>
            <div className="info">
              <p className="name">{slide ? truncate(name, {'length': 22}) : truncate(name, {'length': 18})}</p>
              <p className="description">{slide ? truncate(description, {'length': 63}) : truncate(description, {'length': 45})}</p>
            </div>
          </Link>
          {withBtns ?
            <div className="actions">
              <Link to={`/messages/${userId}`}><span className="b-mp"></span></Link>
              <span className={isFavorite ? "b-heart-fill active" : "b-heart"} onClick={()=>this.handleFav(favorId)}></span>
              <Link to=""><span className="b-sharing"></span></Link>
            </div>
            : null
          }
        </div>
      </StyledCard>
    );
  };
};

export const FavorCard = connect(store => ({user: store.user}))(_FavorCard);
