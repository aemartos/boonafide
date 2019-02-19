import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from '../components/Calendar';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import { TimePicker } from 'antd';
import '../assets/stylesheets/antd.min.css';
import moment from 'moment';
import FormField from '../components/FormField';
import Select from '../components/Select';
import { Button } from '../components/Button';
import { categories as categoriesArr } from '../lib/common/constants';
import { setMarker } from '../lib/common/helpers';
import InputMapSearch from '../components/map/InputMapSearch';
import MapComponent from '../components/map/MapComponent';
import Switch, { State } from 'react-switchable';
import 'react-switchable/dist/main.css';

const StyledAddFavorPage = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2em 0 5em;
  .categoriesFav {
    margin-bottom: .5em;
    font-size: .9em;
    color: ${colors.midPurple};
    span {
      margin-right: .5em;
      .icon {
        font-size: .6em;
        color: ${colors.orange};
      }
    }
  }
  .abg-switch {
    margin-bottom: .3em !important;
  }
  textarea {
    width: 100%;
    min-height: 5em;
    padding: .4em .7em;
    margin-bottom: .7em;
    box-shadow: none;
    outline: 0;
    font-size: .9em;
    font-weight: 400;
    background: transparent;
    color: ${colors.midPurple};
    border: 1px solid ${colors.midPurple};
    border-radius: .5em;
    &::-webkit-input-placeholder, &:-moz-placeholder, &::-moz-placeholder, &:-ms-input-placeholder {
      color: ${colors.midPurple};
    }
  }
  textarea::placeholder {
    color: ${colors.midPurple};
  }
  .input.line {
    margin-bottom: 1em !important;
    padding: .5em .7em !important;
  }
  .dateAndHourBox {
    .text {
      color: ${colors.purple};
      margin-bottom: .5em;
    }
    .dateAndHour {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
  .location {
    .map {
      height: 15em;
      width: 100%;
      background-color: ${colors.darkGrey};
    }
    input {
      margin: 1em 0;
    }
    input::placeholder {
      color: ${colors.midPurple} !important;
    }
  }
  .btn.btn-primary {
    margin-bottom: .5em;
  }
`;

const HoursSelect = styled.div`
  color: ${colors.purple};
  border: 1px solid ${colors.darkGrey};
  border-radius: .3em;
  .activeDay {
    text-align: center;
    font-size: .8em;
    background-color: ${colors.darkGrey};
    color: ${colors.white};
    padding: .5em 0;
  }
  .availableHours {
    text-align: center;
    font-size: .8em;
    height: 9.2em;
    overflow-y: auto;
    p {
      border-bottom: 1px solid ${colors.darkGrey};
      padding: .3em 0;
      span {
        font-size: .7em;
        margin-left: 1em;
        color: ${colors.orange};
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
  .more {
    width: 100%;
    color: ${colors.darkGrey};
  }
  .timePickerComponent {
    .ant-time-picker {
      width: fit-content;
    }
    .ant-time-picker-input {
      width: 8em;
      background-color: transparent;
      border: 0;
      border-top: 1px solid ${colors.darkGrey};
      border-bottom: 1px solid ${colors.darkGrey};
      border-radius: 0;
    }
    .ant-time-picker-icon {
      right: 9px;
    }
  }
`;

export default class _NewFavorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      type: 'Offer',
      name: '',
      description: '',
      remainingFavNum: '',
      picturesUrls: [],
      selectedDay: moment(new Date()).format("DD-MM-YYYY"),
      selectedHour: undefined,
      times: {}
    }
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleMoreHours() {
    if (this.state.selectedHour !== undefined) {
      this.setState({times: {...this.state.times, [this.state.selectedDay]: [...(this.state.times[this.state.selectedDay] || []), this.state.selectedHour ]}, selectedHour: undefined})
    }
  }
  onChangeHour(selectedHour){
    this.setState({ selectedHour });
  }
  handleDeleteHour(idx) {
    this.setState({times: {...this.state.times, [this.state.selectedDay]:
      [...this.state.times[this.state.selectedDay].slice(0, idx), ...this.state.times[this.state.selectedDay].slice(idx+1)]
    }});
  }
  handleAddCategorie(option) {
    if (this.state.categories.indexOf(option) === -1) {
      this.setState({categories: [...this.state.categories, option]});
    }
  }
  handleDeleteCategorie(idx) {
    this.setState({categories: [...this.state.categories.slice(0, idx), ...this.state.categories.slice(idx+1)]})
  }
  onSelectDay(day, isSelected){
    let selectedDay = moment(day).format("DD-MM-YYYY");
    let times = {...this.state.times};
    if (isSelected){
      times = {...this.state.times};
      delete times[selectedDay];
    }
    this.setState({selectedDay, times});
  }
  handleSwitch(type) {
    this.setState({type});
  }
  handleSearch(places) {
    const geometry = places[0].geometry;
    const location = geometry.location;
    this.marker && this.marker.setMap(null);
    this.marker = setMarker(location, this.marker, this.mapObject, undefined, true);
    this.bounds = new window.google.maps.LatLngBounds();
    if (geometry.viewport) {
      this.bounds.union(geometry.viewport);
    } else {
      this.bounds.extend(geometry.location);
    }
    this.mapObject.fitBounds(this.bounds);
  }
  handleAddFavor() {
    const location = {
      type: "Point",
      coordinates: [this.marker.getPosition().lng(), this.marker.getPosition().lat()]
    };
    let service = new window.google.maps.places.PlacesService(this.mapObject);
    service.textSearch({location: this.marker.getPosition(), query: "center"}, (place)=>{
      let locationName = place.length > 0 ? place[0].formatted_address : "Unknown";
      const {categories, type, name, description, remainingFavNum, picturesUrls} = this.state;
      let favor = {
        location,
        locationName,
        categories,
        type,
        name,
        description,
        remainingFavNum,
        picturesUrls,
        creatorId: this.props.user._id
      };
      console.log('ADD', favor);
      // UsersAPI.updateUser(data).then(()=>{
      //     AuthAPI.currentUser()
      //     .then(user => {
      //       this.props.dispatch(updateUser(user));
      //       //this.props.history.push('/');
      //     })
      //     .catch(e => this.props.dispatch(setBusy(false)))
      // })
      // .catch(e=>alert(e));
    });
  }
  render() {
    let {times, selectedDay, selectedHour, categories} = this.state;
    let availableTimesForSelectedDay = times[selectedDay] || [];
    return (
      <div className="contentBox">
        <div className="container">
          <StyledAddFavorPage>

            <div className="categoriesFav">
              {categories.length > 0 ? categories.map((c,i)=> <span key={i}>{c} <span className="icon b-cross" onClick={()=>this.handleDeleteCategorie(i)}></span></span>)
              : <p className="categoriesLabel">First of all, select the favor categories, please :)</p>}
            </div>
            <Select name="categories" options={categoriesArr} onSelectOption={(option)=>this.handleAddCategorie(option)}/>

            <Switch onValueChange={newValue => this.handleSwitch(newValue)}>
              <State active value='Offer'>Offer</State>
              <State active value='Need'>Need</State>
            </Switch>

            <FormField className="line" type="text" placeholder="write a title" onChange={e => this.setState({name: e.target.value})} value={this.state.name}/>
            <textarea placeholder="write a description" onChange={e => this.setState({description: e.target.value})} value={this.state.description}></textarea>
            <FormField className="line" type="number" placeholder="write a number of available favors" onChange={e => this.setState({remainingFavNum: e.target.value})} value={this.state.remainingFavNum}/>

            <div className="dateAndHourBox">
              <div className="text">Select preferred days and hours</div>
              <div className="dateAndHour">
                <Calendar onSelectDay={this.onSelectDay.bind(this)} selectedDay={selectedDay}/>
                <HoursSelect>
                  <div className="activeDay">{selectedDay}</div>
                  <div className="availableHours">{availableTimesForSelectedDay.map((time,i)=> <p key={i}>{time.format("HH:mm")} <span className="b-cross" onClick={()=>this.handleDeleteHour(i)}></span></p>)}</div>
                  <div className="timePickerComponent"><TimePicker popupClassName="timePickerComponent" popupStyle={{width: "8em"}} format={'HH:mm'} value={selectedHour} onChange={this.onChangeHour.bind(this)}/></div>
                  <button className="more" onClick={()=>this.handleMoreHours()}><span className="b-plus"></span></button>
                </HoursSelect>
              </div>
            </div>
            <div className="location">
              <InputMapSearch className="line" handleSearchResult={this.handleSearch}/>
              <MapComponent center={{lat :40.4169473, lng: -3.7035285}} setMap={(map)=>{
                this.mapObject = map;
                this.marker && this.marker.setMap(null);
                this.marker = setMarker({lat :40.4169473, lng: -3.7035285}, this.marker, this.mapObject, undefined, true);
              }}/>
            </div>
            <Button link="" onClick={()=> this.handleAddFavor()} className="btn btn-primary">add favor</Button>
          </StyledAddFavorPage>
        </div>
      </div>
    );
  }
}

export const NewFavorPage = connect(store => ({user: store.user}))(_NewFavorPage);
// onKeyUp={(e)=>{if (e.keyCode === 13) {this.handleAddFavor()}}}
