import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import TimePicker from 'react-time-picker';
import moment from 'moment';
import Switch, { State } from 'react-switchable';
import Calendar from '../components/Calendar';
import { colors } from '../lib/common/colors';
import FormField from '../components/FormField';
import Select from '../components/Select';
import { Button } from '../components/Button';
import { categories as categoriesArr } from '../lib/common/constants';
import { addFavorPictures } from '../lib/API/cloudinary';
import { setMarker } from '../lib/common/helpers';
import InputMapSearch from '../components/map/InputMapSearch';
import MapComponent from '../components/map/MapComponent';
import 'react-switchable/dist/main.css';
import { FavorsAPI } from '../lib/API/favors';
import { AuthAPI } from '../lib/API/auth';
import { updateUser, setBusy } from '../lib/redux/actions';

const StyledAddFavorPage = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2em 0 5em;
  .categoriesFav {
    margin-bottom: .6em;
    font-size: .85em;
    color: ${colors.darkGrey};
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
  .previewImg {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .imgPrev {
      position: relative;
      width: 30%;
      height: 5em;
      overflow: hidden;
      border-radius: .5em;
      background-color: ${colors.darkGrey};
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 1em;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        /* border: 1px solid red; */
        opacity: 0;
        height: 7.3em;
      }
      img {
        width: 60%;
        &.preview {
          width: 100%;
          height: 5em;
          object-fit: cover;
        }
      }
    }
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
      height: 190px;
      .noDay {
        font-size: .9em;
        text-align: center;
        color: ${colors.purple};
        padding: 1em;
      }
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
  .error {
    text-align: center;
    height: 2em;
    color: ${colors.orange};
    font-size: .8em;
    padding-top: 1em;
  }
  .btn.btn-primary {
    margin-bottom: .5em;
  }
`;

const HoursSelect = styled.div`
  color: ${colors.purple};
  border: 1px solid ${colors.darkGrey};
  border-radius: .3em;
  height: -webkit-fill-available;
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
    height: 7.7em;
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
    display: block;
    text-align: center;
    color: ${colors.darkGrey};
    padding: .5em 0 .2em;
    font-size: .8em;
    &.b-plus:hover {
      color: ${colors.black};
      cursor: pointer;
    }
  }
  .timePickerComponent {
    width: 8em;
    background-color: transparent;
    border: 0;
    border-top: 1px solid ${colors.darkGrey};
    border-bottom: 1px solid ${colors.darkGrey};
    border-radius: 0;
    color: ${colors.purple};
    .react-time-picker__wrapper {
      border: 0;
      button svg {
        stroke: ${colors.darkGrey};
        &:hover {
          stroke: ${colors.orange};
        }
      }
    }
    .react-time-picker__inputGroup input {
      color: ${colors.purple};
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
      pictureUrls: [undefined, undefined, undefined],
      imagePreviewUrl: [undefined, undefined, undefined],
      selectedDay: moment(new Date()).format('DD-MM-YYYY'),
      selectedHour: undefined,
      shifts: {},
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    document.body.classList.add('newFavor');
  }

  componentWillUnmount() {
    document.body.classList.remove('newFavor');
  }

  handleAddCategory(option) {
    if (this.state.categories.indexOf(option) === -1) {
      this.setState({ categories: [...this.state.categories, option] });
    }
  }

  handleDeleteCategory(idx) {
    this.setState({ categories: [...this.state.categories.slice(0, idx), ...this.state.categories.slice(idx + 1)] });
  }

  handleDeleteHour(idx) {
    this.setState({
      shifts: {
        ...this.state.shifts,
        [this.state.selectedDay]:
      [...this.state.shifts[this.state.selectedDay].slice(0, idx), ...this.state.shifts[this.state.selectedDay].slice(idx + 1)],
      },
    });
  }

  handleAddHours() {
    if (this.state.selectedHour !== undefined) {
      this.setState({ shifts: { ...this.state.shifts, [this.state.selectedDay]: [...(this.state.shifts[this.state.selectedDay] || []), this.state.selectedHour] }, selectedHour: undefined });
    }
  }

  handleChange(e, i) {
    const reader = new FileReader();
    const img = e.target.files[0];
    reader.onloadend = () => {
      const pictureUrls = [...this.state.pictureUrls];
      const imagePreviewUrl = [...this.state.imagePreviewUrl];
      pictureUrls[i] = img;
      imagePreviewUrl[i] = reader.result;
      this.setState({
        pictureUrls,
        imagePreviewUrl,
      });
    };
    reader.readAsDataURL(img);
  }

  handleSwitch(type) {
    this.setState({ type });
  }

  handleSearch(places) {
    const { geometry } = places[0];
    const { location } = geometry;
    if (this.marker) this.marker.setMap(null);
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
    const {
      categories, type, name, description, remainingFavNum, shifts,
    } = this.state;
    if (categories && categories.length > 0 && type !== undefined && name !== undefined && description !== undefined && remainingFavNum !== undefined && Object.keys(shifts).length > 0) {
      this.props.dispatch(setBusy('force'));
      addFavorPictures(this.state.pictureUrls).then((pictureUrls) => {
        const location = {
          type: 'Point',
          coordinates: [this.marker.getPosition().lng(), this.marker.getPosition().lat()],
        };
        const service = new window.google.maps.places.PlacesService(this.mapObject);
        service.textSearch({ location: this.marker.getPosition(), query: 'center' }, (place) => {
          const locationName = place.length > 0 ? place[0].formatted_address : 'Unknown';
          const favor = {
            location,
            locationName,
            categories,
            type,
            name,
            description,
            pictureUrls,
            remainingFavNum,
            shifts,
          };
          FavorsAPI.createFavor(favor).then((res) => {
            AuthAPI.currentUser()
              .then((user) => {
                this.props.dispatch(updateUser(user));
                this.props.history.push(`/favors/${res._id}`);
              });
          })
            .catch((e) => {
              this.props.dispatch(setBusy(false));
              this.setState({ showError: e.data });
            });
        });
      });
    } else {
      this.handleBlankFields();
    }
  }

  handleBlankFields() {
    this.setState({ showError: 'You have to fill in all the fields :)' });
    setTimeout(() => this.setState({ showError: undefined }), 1500);
  }

  onSelectDay(day, isSelected) {
    let selectedDay = moment(day).format('DD-MM-YYYY');
    let shifts = { ...this.state.shifts };
    if (isSelected) {
      shifts = { ...this.state.shifts };
      delete shifts[selectedDay];
      selectedDay = undefined;
    }
    this.setState({ selectedDay, shifts });
  }

  onChangeHour(selectedHour) {
    this.setState({ selectedHour });
  }

  render() {
    const {
      shifts, selectedDay, selectedHour, categories, imagePreviewUrl, showError,
    } = this.state;
    const availableTimesForSelectedDay = shifts[selectedDay] || [];
    return (
      <div className="contentBox">
        <div className="container">
          <StyledAddFavorPage>

            <div className="categoriesFav">
              {categories.length > 0 ? categories.map((c, i) => (
                <span key={i}>
                  {c}
                  {' '}
                  <span tabIndex={0} aria-hidden="true" role="button" className="icon b-cross" onClick={() => this.handleDeleteCategory(i)} />
                </span>
              ))
                : <p className="categoriesLabel">First of all, select the favor categories, please :)</p>}
            </div>
            <Select className="catSelect" name="categories" options={categoriesArr} onSelectOption={(option) => this.handleAddCategory(option)} />

            <Switch onValueChange={(newValue) => this.handleSwitch(newValue)}>
              <State active value="Offer">Offer</State>
              <State active value="Need">Need</State>
            </Switch>

            <div className="previewImg">
              {[...Array(3)].map((u, i) => (
                <div key={i} className="imgPrev">
                  <input type="file" onChange={(e) => this.handleChange(e, i)} />
                  <img className={imagePreviewUrl[i] ? 'preview' : ''} src={imagePreviewUrl[i] ? imagePreviewUrl[i] : '/images/addPic.png'} alt="favor pic" />
                </div>
              ))}
            </div>

            <FormField className="line" type="text" placeholder="write a title" onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name} />
            <textarea placeholder="write a description" onChange={(e) => this.setState({ description: e.target.value })} value={this.state.description} />
            <FormField className="line" type="number" placeholder="write a number of available favors" onChange={(e) => this.setState({ remainingFavNum: e.target.value })} value={this.state.remainingFavNum} />

            <div className="dateAndHourBox">
              <div className="text">Select preferred days and hours</div>
              <div className="dateAndHour">
                <Calendar onSelectDay={() => this.onSelectDay()} selectedDay={selectedDay} />
                { selectedDay ? (
                  <HoursSelect>
                    <div className="activeDay">{selectedDay}</div>
                    <div className="availableHours">
                      {availableTimesForSelectedDay.map((time, i) => (
                        <p key={i}>
                          {time}
                          {' '}
                          <span tabIndex={0} aria-hidden="true" role="button" className="b-cross" onClick={() => this.handleDeleteHour(i)} />
                        </p>
                      ))}
                    </div>
                    <div>
                      <TimePicker
                        className="timePickerComponent"
                        value={selectedHour}
                        onChange={() => this.onChangeHour()}
                        disableClock
                      />
                    </div>
                    <span tabIndex={0} aria-hidden="true" role="button" className="more b-plus" onClick={() => this.handleAddHours()} />
                  </HoursSelect>
                ) : <p className="noDay">Please, select a day to set different times</p> }
              </div>
            </div>
            <div className="location">
              <InputMapSearch className="line" handleSearchResult={this.handleSearch} />
              <MapComponent
                center={{ lat: 40.4169473, lng: -3.7035285 }}
                setMap={(map) => {
                  this.mapObject = map;
                  if (this.marker) this.marker.setMap(null);
                  this.marker = setMarker({ lat: 40.4169473, lng: -3.7035285 }, this.marker, this.mapObject, undefined, true);
                }}
              />
            </div>
            <div className="error">{showError || null}</div>
            <Button link="" onClick={() => this.handleAddFavor()} className="btn btn-primary">add favor</Button>
          </StyledAddFavorPage>
        </div>
      </div>
    );
  }
}

export const NewFavorPage = connect((store) => ({ user: store.user }))(_NewFavorPage);
// onKeyUp={(e)=>{if (e.keyCode === 13) {this.handleAddFavor()}}}
