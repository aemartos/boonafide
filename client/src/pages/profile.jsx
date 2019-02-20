import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProfilePicture } from '../lib/API/cloudinary';
import { AuthAPI } from '../lib/API/auth';
import { updateUser, setBusy } from '../lib/redux/actions';
import { UsersAPI } from '../lib/API/users';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { Button } from '../components/Button';
import { FavorThumb } from '../components/FavorThumb';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Switch, { State } from 'react-switchable';
import 'react-switchable/dist/main.css';

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
      file: null,
      switchFav: "Offer",
      favOffer: [],
      favNeed: []
    }
  }
  handleSwitch(switchFav) {
    this.setState({switchFav});
    if (switchFav === "Offer") {
      this.slider.slickGoTo(0);
    } else if (switchFav === "Need") {
      this.slider.slickGoTo(1);
    }
  }
  handleChange(e) {
    this.setState({file: e.target.files[0]});
  }
  handleSubmit(e) {
    e.preventDefault();
    addProfilePicture(this.state.file);
  }
  componentWillMount(){
    this.props.dispatch(setBusy(true));
  }
  componentDidMount(){
    if (this.props.match.params.id) {
      let id = this.props.match.params.id;
      UsersAPI.getUser(id).then(user => this.setState({user, favOffer: user.favOffer, favNeed: user.favNeed}))
        .catch(e => this.props.history.push('/not-found'));
    } else {
      AuthAPI.currentUser().then(user => {
        this.props.dispatch(updateUser(user));
        this.setState({favOffer: user.favOffer, favNeed: user.favNeed})
      }).catch(e => this.props.dispatch(setBusy(false)));
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
    const {isBusy} = this.props;
    const {favOffer, favNeed} = this.state;
    //console.log(favOffer.length, favNeed.length);
    // const {switchFav} = this.state;
    //const favorsOption = `fav${switchFav}`;
    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: false,
      swipe: false,
      speed: 300
    };
    return (
      <div className="contentBox">
        <div className="container">
          <ContentBox>
            {user && !isBusy ?
              <React.Fragment>
                <h2 className="username">{user.username}</h2>
                <div className="mainBox">
                  <div className="profPic"><img src={user.pictureUrl} alt="profile pic"/></div>
                  <div className="actions">
                  {myUser ?
                    <span className="b-edit"></span>
                  :
                    <React.Fragment>
                      <Link to={`/messages/${user._id}`}><span className="b-mp"></span></Link>
                      <span className="b-sharing"></span>
                    </React.Fragment>
                  }
                  </div>
                </div>

                <div className="currentHelped">
                  {/* {user.currentHelped.map(u => <img src={u ? u.pictureUrl : "/images/personIcon.png"} alt="userHelped pic"/>)} */}
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
                {myUser ? <form onSubmit={(e)=>this.handleSubmit(e)}>
                  <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
                  <button type="submit">Save new profile picture</button>
                </form> : null}


                <div className="favSwitch">
                  <Switch onValueChange={newValue => this.handleSwitch(newValue)}>
                    <State active value='Offer'>Offer</State>
                    <State active value='Need'>Need</State>
                  </Switch>

                  {/* <div className="favors" pose={true ? 'on' : 'off'}>
                    {user[favorsOption].map(f => <FavorThumb key={f._id} favorId={f._id} img={f.picturesUrls[0]} name={f.name} description={f.description} />)}
                  </div> */}
                  <div className="favors">
                    <Slider ref={slider => (this.slider = slider)} {...settings}>
                      <div className="offer">
                        {favOffer.length > 0 ?
                          favOffer.map(f => <FavorThumb key={f._id} favorId={f._id} img={f.picturesUrls[0]} name={f.name} description={f.description} />)
                          : <p className="noFavors">You have no favor offering, please consider adding some</p>
                        }
                      </div>
                      <div className="need">
                        {favNeed.length > 0 ?
                          favNeed.map(f => <FavorThumb key={f._id} favorId={f._id} img={f.picturesUrls[0]} name={f.name} description={f.description} />)
                          : <p className="noFavors">It seems you don't need anything, that's ok, but you may consider adding something</p>
                        }
                      </div>
                    </Slider>
                  </div>
                </div>

                <div className="tickets">
                  <Button link="/tickets" className="btn btn-primary">See tickets</Button>
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
