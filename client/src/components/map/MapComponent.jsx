import React from 'react';
import { mapStyle } from '../../lib/common/constants';

export default class MapComponent extends React.Component {

  componentDidMount(){
    const {lat, lng} =this.props.center;
    this.mapObject = new window.google.maps.Map(
      this.map, {
        zoom: 10,
        center: {lat, lng },
        disableDefaultUI: true,
        clickableIcons: false,
        clickableLabels: false,
        styles: mapStyle
      }
    );
    this.props.setMap(this.mapObject);
  }

  render(){
    return  <div className="map" id="map" ref={map => (this.map = map)}></div>;
  }
}
