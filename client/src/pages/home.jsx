import React, { Component } from 'react';
import { FavorsAPI } from '../lib/API/favors';
import FormField from '../components/FormField';
import { FavorCard } from '../components/FavorCard';
import styled from '@emotion/styled';
import { colors } from '../lib/common/colors';
import Slider from "react-slick";

const SearchBox = styled.div`
  position: absolute;
  width: 100%;
  padding: .5em 1em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.midGrey};
  color: ${colors.midPurple};
  z-index: 3;
  &:before {
    content: "l";
    font-family: "boonafide";
    position: absolute;
    left: 2em;
    top: 1.1em;
  }
  input.input.light {
    width: 95%;
    padding-left: 2.5em !important;
  }
  span {
    font-size: 1.5em;
    margin-top: .15em;
  }
`;

const ContentBox = styled.div`
  width: 90%;
  /* margin: 2em auto 6em; */
  margin: 0 auto;
  padding: 5em 0 6em;
  .slick-list {
    width: ${props => props.favors.length < 2 ? "100%" : "105.5%"};
  }
  .slick-slide {
    margin-right: 1em;
  }
  .favorsOthers {
    margin-bottom: 2em;
  }
  .favorsBox {
    .title {
      font-family: "Baloo Bhaina";
      font-size: 1.5em;
      line-height: 1em;
      color: ${colors.purple};
      margin-bottom: 1em;
    }
    .favorsNearby, .favorsSearch {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorsOthersNeed: [],
      favorsNearby: [],
      filterFavors: null,
      search: ''
    }
  }
  handleSearch(e) {
    if (e.target.value !== "") {
      FavorsAPI.getFavorSearch(`${e.target.value}`).then(filterFavors => this.setState({filterFavors}));
    } else if (e.target.value === "") {
      this.setState({filterFavors: null});
    }
    this.setState({search: e.target.value || ''});
  }
  componentDidMount() {
    FavorsAPI.offerFavors().then(favorsOthersNeed => this.setState({favorsOthersNeed})).catch(()=>{});
    FavorsAPI.nearbyFavors().then(favorsNearby => this.setState({favorsNearby})).catch(()=>{});
  }
  render() {
    const {search, filterFavors, favorsOthersNeed, favorsNearby} = this.state;
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: favorsOthersNeed.length < 2 ? 1 : 1.5,
      initialSlide: 0,
      slidesToScroll: 1,
      // variableWidth: true,
      adaptiveHeight: true,
    };
    return (
      <div className="contentBox">
        <div className="container">
          <SearchBox>
            <FormField className="light" type="text" placeholder="search favors..." onChange={(e)=>this.handleSearch(e)} value={search}/>
            <span className="b-filters"></span>
          </SearchBox>
          <ContentBox favors={favorsOthersNeed}>
            {search && filterFavors ?
              <div className="favorsBox">
                <div className="favorsSearch">
                  {filterFavors.map(f => <FavorCard key={f._id} favorId={f._id} userId={f.creatorId._id} type={f.type} img={f.pictureUrls[0]} username={f.creatorId.username} date={f.creationdate} name={f.name} description={f.description}/>)}
                </div>
              </div>
              :
              <React.Fragment>
                <div className="favorsBox favorsOthers">
                  <p className="title">We have found this favors you can offer</p>
                  <Slider {...settings}>
                    {favorsOthersNeed.map(f => <FavorCard key={f._id} favorId={f._id} userId={f.creatorId._id} type={f.type} img={f.pictureUrls[0]} username={f.creatorId.username} date={f.creationdate} name={f.name} description={f.description} slide/>)}
                  </Slider>
                </div>
                <div className="favorsBox">
                  <p className="title">Favors near you</p>
                  <div className="favorsNearby">
                    {favorsNearby.map(f => <FavorCard key={f._id} favorId={f._id} userId={f.creatorId._id} type={f.type} img={f.pictureUrls[0]} username={f.creatorId.username} date={f.creationdate} name={f.name} description={f.description} withBtns/>)}
                  </div>
                </div>
              </React.Fragment>
            }
          </ContentBox>
        </div>
      </div>
    );
  }
}
