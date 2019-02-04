import React, { Component } from 'react';
import { FavorsAPI } from '../lib/API/favors';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorsOthersNeed: [],
      favorsNearby: []
    }
  }
  componentDidMount() {
    FavorsAPI.offerFavors().then(favorsOthersNeed => this.setState({favorsOthersNeed}));
    FavorsAPI.nearbyFavors().then(favorsNearby => this.setState({favorsNearby}));
  }
  render() {
    const {favorsOthersNeed, favorsNearby} = this.state;
    return (
      <div className="contentBox">
        <div className="container">
          <p>This is the home Page</p>
          <hr/>
          <div className="favorsNearby">
            <p>Favors Others Need</p>
            {favorsOthersNeed.map(f => {
              return <p key={f._id}>{f.name}</p>;
            })}
          </div>
          <hr/>
          <div className="favorsNearby">
            <p>Favors Nearby</p>
            {favorsNearby.map(f => {
              return <p key={f._id}>{f.name}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
