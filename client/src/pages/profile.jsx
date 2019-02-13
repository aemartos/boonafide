import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPicture } from '../lib/API/cloudinary';
import { AuthAPI } from '../lib/API/auth';
import { updateUser, setBusy } from '../lib/redux/actions';
import { UsersAPI } from '../lib/API/users';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { Button } from '../components/Button';
import { FavorThumb } from '../components/FavorThumb';
import posed from 'react-pose';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Switch, { State } from 'react-switchable';
import 'react-switchable/dist/main.css';

const ContentBox = styled.div`
  width: 90%;
  margin: 2em auto;
  > * {
    margin-bottom: 1.5em;
  }
  /* > * {
    margin-bottom: 1.5em;
    padding-bottom: 1.3em;
    border-bottom: 1px solid ${colors.darkGrey};
    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  } */
  .username {
    font-family: "Baloo Bhaina";
    text-transform: capitalize;
    font-size: 1.5em;
    line-height: 1em;
    color: ${colors.purple};
    margin-bottom: .5em;
  }
  .mainBox {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    img {
      flex: 1;
      border-radius: .3em;
      border: 1px solid ${colors.darkGrey};
      height: 15em;
      object-fit: cover;
    }
    .actions {
      font-size: 2em;
      margin-left: .5em;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      span {
        &.b-mp {
          color: ${colors.green};
        }
        &.b-edit {
          color: ${colors.orange};
        }
        &.b-sharing {
          font-size: .9em;
          color: ${colors.purple};
        }
      }
    }
  }
  .currentHelped {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5em;
    padding-bottom: 1.3em;
    border-bottom: 1px solid ${colors.darkGrey};
    img {
      width: 30%;
    }
  }
  .stats {
    margin-bottom: 1em;
    padding-bottom: 1.3em;
    border-bottom: 1px solid ${colors.darkGrey};
    .statsBox {
      width: 90%;
      margin: 2em auto .3em;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      font-family: "Baloo Bhaina";
      font-size: 1.2em;
      line-height: .5em;
      color: ${colors.purple};
      .statItem {
        text-align: center;
        &.boons {
          margin-top: -.7em;
          .number {
            margin-bottom: .2em;
          }
        }
      }
      .number {
        font-size: 2.5em;
        margin-bottom: .3em;
        span {
          font-size: .6em;
          line-height: 0;
          -webkit-text-stroke: 1px;
        }
      }
    }
  }
  .location {
    padding-bottom: .8em;
    margin-bottom: 1em;
    border-bottom: 1px solid ${colors.darkGrey};
    .locationText {
      font-size: 1.2em;
      line-height: 1em;
      font-family: "Baloo Bhaina";
      color: ${colors.purple};
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      span {
        color: ${colors.orange};
        margin-right: .5em;
      }
    }
  }
  .description {
    font-weight: 100;
    color: ${colors.purple};
    margin-bottom: 1.5em;
    padding-bottom: 0;
    border-bottom: 0;
  }
  .favors {
    height: 22em;
    overflow-y: auto;
  }
`;

const Favors = posed.div({
  on: {
    x: '0%'
  },
  off: { x: '-100%', delay: 300 }
});

class _ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      switchFav: "Offer"
    }
  }
  handleChange(e) {
    this.setState({file: e.target.files[0]});
  }
  handleSwitch(newValue) {
    this.setState({switchFav: newValue});
    if (this.state.switchFav === "Offer") {
      this.slider.slickNext();
    } else if (this.state.switchFav === "Need") {
      this.slider.slickPrev();
    }
    // console.log('The new value is => ', newValue);
  }
  handleSubmit(e) {
    e.preventDefault();
    addPicture(this.state.file);
  }
  componentWillMount(){
    this.props.dispatch(setBusy(true));
  }
  componentDidMount(){
    if (this.props.match.params.id) {
      let id = this.props.match.params.id;
      UsersAPI.getUser(id).then(user => this.setState({user}))
        .catch(e => this.props.history.push('/not-found'));
    } else {
      AuthAPI.currentUser().then(user => this.props.dispatch(updateUser(user)))
        .catch(e => this.props.dispatch(setBusy(false)));
    }
  }
  componentWillUpdate(nextProps, nextState){
    if (!this.state.user && nextState.user) {
      this.props.dispatch(setBusy(false));
    }
  }
  render() {
    const myUser = !this.state.user;
    const {user} = myUser ? this.props : this.state;
    const {switchFav} = this.state;
    const {isBusy} = this.props;
    const favorsOption = `fav${switchFav}`;
    const settings = {
      dots: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: false,
      swipe: false,
      speed: 300,
    };
    return (
      <div className="contentBox">
        <div className="container">
          <ContentBox>
            {user && !isBusy ?
              <React.Fragment>
                <h2 className="username">{user.username}</h2>
                <div className="mainBox">
                  <img src={user.pictureUrl} alt="profile pic"/>
                  <div className="actions">
                  {myUser ?
                    <span className="b-edit"></span>
                  :
                    <React.Fragment>
                      <span className="b-mp"></span>
                      <span className="b-sharing"></span>
                    </React.Fragment>
                  }
                  </div>
                </div>

                <div className="currentHelped">
                  {user.currentHelped.map(u => <img src={u ? u.pictureUrl : "/images/personIcon.png"} alt="userHelped pic"/>)}
                  {[...Array(3)].map((u, i) => <img key={i} src={user.currentHelped[i] ? user.currentHelped[i].pictureUrl : "/images/personIcon.png"} alt="userHelped pic"/>)}
                  {/* <img src={user.currentHelped[0] ? user.currentHelped[0].pictureUrl : "/images/personIcon.png"} alt="userHelped pic"/>
                  <img src={user.currentHelped[1] ? user.currentHelped[1].pictureUrl : "/images/personIcon.png"} alt="userHelped pic"/>
                  <img src={user.currentHelped[2] ? user.currentHelped[2].pictureUrl : "/images/personIcon.png"} alt="userHelped pic"/> */}
                </div>

                <div className="stats">
                  <div className="statsBox">
                    <div className="statItem received">
                      <p className="number">{user.favReceived.length}</p>
                      <p className="text">received</p>
                    </div>
                    <div className="statItem done">
                      <p className="number">{user.favDone.length}</p>
                      <p className="text">done</p>
                    </div>
                    <div className="statItem boons">
                      <p className="number">{user.boons.length}<span className="b-boon"></span></p>
                      <p className="text">boons</p>
                    </div>
                  </div>
                </div>

                <div className="location">
                  <p className="locationText"> <span className="b-location"></span>{user.locationName}</p>
                </div>

                <div className="description">{user.description}</div>
                {/* {myUser ? <form onSubmit={(e)=>this.handleSubmit(e)}>
                  <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
                  <button type="submit">Save new profile picture</button>
                </form> : null} */}


                <div className="favSwitch">
                  <Switch onValueChange={newValue => this.handleSwitch(newValue)}>
                    <State active value='Offer'>Offer</State>
                    <State active value='Need'>Need</State>
                  </Switch>

                  {/* <Favors className="favors" pose={true ? 'on' : 'off'}>
                    {user[favorsOption].map(f => <FavorThumb key={f._id} favorId={f._id} img={f.picturesUrls[0]} name={f.name} description={f.description} />)}
                  </Favors> */}
                  <div className="favors">
                    <Slider ref={slider => (this.slider = slider)} {...settings}>
                      <div className="offer">
                        {user.favOffer.map(f => <FavorThumb key={f._id} favorId={f._id} img={f.picturesUrls[0]} name={f.name} description={f.description} />)}
                      </div>
                      <div className="need">
                        {user.favNeed.map(f => <FavorThumb key={f._id} favorId={f._id} img={f.picturesUrls[0]} name={f.name} description={f.description} />)}
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="tickets">
                  <Button link="" className="btn btn-primary">See tickets</Button>
                </div>
              </React.Fragment>
              : null
            }
        </ContentBox>
      </div>
    </div>
    );
  }
}

export const ProfilePage = connect(store => ({user: store.user}))(withRouter(_ProfilePage));
