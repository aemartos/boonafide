import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import CountUp from 'react-countup';
// import { addProfilePicture } from '../lib/API/cloudinary';
import Switch from '../components/Switch';
import { AuthAPI } from '../lib/API/auth';
import { BoonsAPI } from '../lib/API/boons';
import { updateUser, setBusy } from '../lib/redux/actions';
import { UsersAPI } from '../lib/API/users';
import { colors } from '../lib/common/colors';
import { Button } from '../components/Button';
import { FavorThumb } from '../components/FavorThumb';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ContentBox = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2em 0 5em;
  > * {
    margin-bottom: 1.5em;
  }
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
    .profPic {
      flex: 1;
      border-radius: .3em;
      border: 1px solid ${colors.darkGrey};
      height: 15em;
      overflow: hidden;
      img {
        width: 100%;
        height: 15em;
        object-fit: cover;
      }
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
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5em;
    padding-bottom: 1.3em;
    border-bottom: 1px solid ${colors.darkGrey};
    img {
      width: 6em;
      height: 6em;
      border-radius: 50%;
      object-fit: cover;
      opacity: ${(props) => (props.user.currentHelped.length >= 3 && props.myUser ? '.3' : '1')};
    }
    .redeemBtn {
      position: absolute;
      width: 100%;
      margin-top: 0;
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
        .number {
          font-size: 2em;
          font-weight: bold;
          color: ${colors.purple};
          margin-bottom: 1em;
        }
        .text {
          margin-top: .5em;
        }
        &.boons {
          margin-top: -.7em;
          .b-boon{
            font-size: 1.4em;
            margin-left: .2em;
          }
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
    .offer, .need {
      .noFavors {
        font-family: "Baloo Bhaina";
        font-size: 1.3em;
        line-height: 1.2em;
        color: ${colors.midPurple};
        padding: 1em;
        text-align: center;
      }
    }
  }
`;
class _ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // file: null,
      type: 'Offer',
      favOffer: [],
      favNeed: [],
      currentHelped: [],
    };
  }

  componentWillMount() {
    this.props.dispatch(setBusy(true));
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      UsersAPI.getUser(id).then((user) => this.setState({
        user, favOffer: user.favOffer, favNeed: user.favNeed, currentHelped: user.currentHelped,
      }))
        .catch(() => this.props.history.push('/not-found'));
    } else {
      AuthAPI.currentUser().then((user) => {
        this.props.dispatch(updateUser(user));
        this.setState({ favOffer: user.favOffer, favNeed: user.favNeed, currentHelped: user.currentHelped });
      }).catch(() => this.props.dispatch(setBusy(false)));
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.user && nextState.user) {
      this.props.dispatch(setBusy(false));
    }
  }

  handleSwitch(type) {
    this.setState({ type });
    if (type === 'Offer') {
      this.slider.slickGoTo(0);
    } else if (type === 'Need') {
      this.slider.slickGoTo(1);
    }
  }

  // handleChange(e) {
  //   this.setState({ file: e.target.files[0] });
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  // //   addProfilePicture(this.state.file);
  // }

  handleRedeemBoon() {
    BoonsAPI.redeemBoon().then(() => {
      AuthAPI.currentUser().then((user) => {
        this.props.dispatch(updateUser(user));
        this.setState({ currentHelped: user.currentHelped });
      }).catch(() => this.props.dispatch(setBusy(false)));
    }).catch(() => this.props.history.push('/not-found'));
  }

  render() {
    const myUser = !this.state.user;
    const { user } = myUser ? this.props : this.state;
    const { isBusy } = this.props;
    const { favOffer, favNeed, currentHelped } = this.state;
    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: false,
      swipe: false,
      speed: 300,
    };
    return (
      <div className="contentBox">
        <div className="container">
          <ContentBox user={user} myUser={myUser}>
            {user && !isBusy
              ? (
                <>
                  <h2 className="username">{user.username}</h2>
                  <div className="mainBox">
                    <div className="profPic"><img src={user.pictureUrl} alt="profile pic" /></div>
                    <div className="actions">
                      {myUser
                        ? <span className="b-edit" />
                        : (
                          <>
                            <Link to={`/messages/${user._id}`}><span className="b-mp" /></Link>
                            <span className="b-sharing" />
                          </>
                        )}
                    </div>
                  </div>

                  <div className="currentHelped">
                    {[...Array(3)].map((_u, i) => <Link key={i} to={currentHelped[i] ? `/profile/${currentHelped[i]._id.toString()}` : '#'}><img key={i} src={currentHelped[i] ? currentHelped[i].pictureUrl : '/images/personIcon.png'} alt="userHelped pic" /></Link>)}
                    {currentHelped.length >= 3 && myUser
                      ? <Button className="btn btn-primary redeemBtn" onClick={() => this.handleRedeemBoon()}>Redeem boon!</Button>
                      : null}
                  </div>

                  <div className="stats">
                    <div className="statsBox">
                      <div className="statItem received">
                        <CountUp
                          end={user.favReceived.length}
                          duration={1.5}
                          useEasing
                          className="number"
                        />
                        <p className="text">received</p>
                      </div>
                      <div className="statItem done">
                        <CountUp
                          end={user.favDone.length}
                          duration={1.5}
                          className="number"
                        />
                        <p className="text">done</p>
                      </div>
                      <div className="statItem boons">
                        <CountUp
                          end={user.boons.length}
                          duration={1.5}
                          className="number"
                        />
                        <span className="b-boon" />
                        <p className="text">boons</p>
                      </div>
                    </div>
                  </div>

                  <div className="location">
                    <p className="locationText">
                      {' '}
                      <span className="b-location" />
                      {user.locationName}
                    </p>
                  </div>

                  <div className="description">{user.description}</div>

                  {/* {myUser ? <form onSubmit={(e)=>this.handleSubmit(e)}>
                  <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
                  <button type="submit">Save new profile picture</button>
                </form> : null} */}

                  <div className="favSwitch">
                    <Switch
                      value={this.state.type}
                      options={['Offer', 'Need']}
                      onChange={(newValue) => this.handleSwitch(newValue)}
                    />

                    <div className="favors">
                      {/* eslint-disable-next-line no-return-assign */}
                      <Slider ref={(slider) => (this.slider = slider)} {...settings}>
                        <div className="offer">
                          {favOffer.length > 0
                            ? favOffer.map((f) => <FavorThumb key={f._id} favorId={f._id} img={f.pictureUrls[0]} name={f.name} description={f.description} />)
                            : <p className="noFavors">You have no favor offering, please consider adding some</p>}
                        </div>
                        <div className="need">
                          {favNeed.length > 0
                            ? favNeed.map((f) => <FavorThumb key={f._id} favorId={f._id} img={f.pictureUrls[0]} name={f.name} description={f.description} />)
                            : <p className="noFavors">It seems you don&apos;t need anything, that&apos;s ok, but you may consider adding something</p>}
                        </div>
                      </Slider>
                    </div>
                  </div>

                  <div className="tickets">
                    <Button link="/tickets" className="btn btn-primary">See tickets</Button>
                  </div>
                </>
              )
              : null}
          </ContentBox>
        </div>
      </div>
    );
  }
}

export const ProfilePage = connect((store) => ({ user: store.user }))(withRouter(_ProfilePage));
