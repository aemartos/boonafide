import React, { Component } from 'react';
import styled from '@emotion/styled';
import { categories, mapStyle } from '../lib/common/constants';
import { colors } from '../lib/common/colors';
import { Button } from '../components/Button';
import FormField from '../components/FormField';
import { UsersAPI } from '../lib/API/users';
import { AuthAPI } from '../lib/API/auth';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { updateUser, setBusy } from '../lib/redux/actions';

const StyledFirstSteps = styled.div`
  position: relative;
  height: 100%;
  .progress-box {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 2em;
    .progress-bar {
      height: .5em;
      border-radius: 5em;
      background-color: ${colors.darkGrey};
      flex: 1;
      .fill-bar {
        border-radius: 5em;
        height: inherit;
        background-color: ${colors.purple};
        z-index: 1;
      }
    }
    .numbers {
      color: ${colors.darkGrey};
      margin-left: .5em;
      font-size: .7em;
      font-weight: 600;
    }
  }
  .btn {
    width: 80%;
    margin: 0 auto;
    &:hover, &:active {
      opacity: 1 !important;
      transform: scale(1,1) !important;
      transition: (all 250ms cubic-bezier(0.4, 0, 0.2, 1));
    }
  }
  .map {
    position: absolute;
    bottom: 0;
    height: 35.3em;
    width: 100%;
    background-color: ${colors.darkGrey};
  }
  .slick-slider {
    height: calc(100% - 8em);
  }
`;

const Item = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .box {
    width: 80%;
    margin: 0 auto;
  }
  h3 {
    width: 90%;
    margin: 1em auto .5em;
    color: ${colors.purple};
    font-family: "Baloo Bhaina";
    line-height: 1.2em;
    text-align: center;
  }
  .cats {
    button {
      &.cat-selected {
        color: red;
      }
    }
  }
  .question {
    &.location {
      width: 80%;
    }
  }
  input {
    border: 0 !important;
    border-radius: 0 !important;
    margin: .6em 0 0 !important;
    padding: 1em 2em !important;
    color: ${colors.darkGrey} !important;
  }
`;

const CategoryBox = (cat, index, action, cb) => (
  <button key={cat} onClick={()=> cb(cat, index, action)} className={"cat" + (index !== -1 ? " cat-selected" : "")}>
    <span className={`b-${cat}`}></span>
    <span className="text">{cat}</span>
  </button>
);

export default class FirstStepsPage extends Component {
  constructor() {
    super();
    this.state = {
      offerCategories: [],
      needCategories: [],
      slideIndex: 0
    }
    this.handleCat = this.handleCat.bind(this);
  }

  handleCat(cat, index, action) {
    if (index === -1) {
      this.setState({[action]: [...this.state[action], cat]});
    } else {
      let deletedState = [...this.state[action]];
      deletedState.splice(index, 1);
      this.setState({[action]: deletedState});
    }
  }

  handleFinish(){
    const location = {
      type: "Point",
      coordinates: [this.marker.getPosition().lng(), this.marker.getPosition().lat()]
    };
    const {offerCategories, needCategories} = this.state;
    let data = {
      location,
      offerCategories,
      needCategories
    }
    UsersAPI.updateUser(data).then(()=>{
        AuthAPI.currentUser()
        .then(user => {
          this.props.dispatch(updateUser(user));
          this.props.history.push('/profile');
        })
        .catch(e => this.props.dispatch(setBusy(false)))
    })
    .catch(e=>alert(e));
    //window.location = '/profile';
  }

  componentDidUpdate() {
    if(this.state.slideIndex === 2 && window.google) {
      const lat = 40.4169473;
      const lng = -3.7035285;
      let map = new window.google.maps.Map(
        this.map, {
          zoom: 10,
          center: {lat, lng },
          disableDefaultUI: true,
          clickableIcons: false,
          clickableLabels: false,
          styles: mapStyle
        }
      );
      this.marker = new window.google.maps.Marker({
        title: "User location",
        position: {lat, lng},
        map,
        draggable: true,
        animation: window.google.maps.Animation.DROP
      });
      this.marker.setMap(map);
      window.google.maps.event.trigger(this.map,'resize');
      //
    }
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };
    return (
      <div className="contentBox">
        <div className="container" style={{width: "100%"}}>
          <StyledFirstSteps>
            <div className="progress-box">
              <div className="progress-bar">
                <div className="fill-bar" style={{width: ((this.state.slideIndex + 1) * 33.333333) + "%" }}></div>
              </div>
              <div className="numbers"><span className="current-step">{this.state.slideIndex+1}</span>/3</div>
            </div>

            <Slider ref={slider => (this.slider = slider)} {...settings}>

              <Item>
                <div className="box">
                  <h3 className="question">how are you going to change the world? what can you offer?</h3>
                  <div className="cats offer-cats">
                    {categories.map((cat) => CategoryBox(cat, this.state.offerCategories.indexOf(cat), "offerCategories", this.handleCat))}
                  </div>
                </div>
              </Item>

              <Item>
                <div className="box">
                  <h3 className="question">help others to spread the favor chain? what do you need?</h3>
                  <div className="cats need-cats">
                    {categories.map((cat) => CategoryBox(cat, this.state.needCategories.indexOf(cat), "needCategories", this.handleCat))}
                  </div>
                </div>
              </Item>

              <Item>
                <h3 className="question location">please, select a location</h3>
                <FormField type="text" placeholder="write a search"/>
              </Item>

            </Slider>
            {this.state.slideIndex === 2 ? <div className="map" id="map" ref={map => (this.map = map)}></div>:null}

            {this.state.slideIndex === 2 ?
              <Button className="btn btn-primary" onClick={()=>{this.handleFinish()}}>finish</Button>
              :
              <Button className="btn btn-primary" onClick={()=>{this.slider.slickGoTo(this.state.slideIndex+1)}}>next</Button>
            }
          </StyledFirstSteps>
        </div>
      </div>
    );
  }
}
