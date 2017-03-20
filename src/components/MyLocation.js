import React, { Component } from 'react';
import PlaceName from './PlaceName';

class MyLocation extends Component {
  render() {
    return (
      <div
        className='relative bg-white shadow-darken25 mt6 border-darken10 bg-gray-faint-on-hover hmin36 flex-parent flex-parent--center-cross pr12 cursor-pointer w-full w420-mm'
        onClick={this.props.onClick}
      >
        <div className='absolute flex-parent flex-parent--center-cross flex-parent--center-main w42 h42'>
          <svg className='icon color-darken25'><use xlinkHref='#icon-marker'></use></svg>
        </div>
        <div className='pl42'>
          <PlaceName location={this.props.userLocation} colors='dark'/>
        </div>
      </div>
    );
  }
}

MyLocation.propTypes = {
  userLocation: React.PropTypes.object,
  onClick: React.PropTypes.func
}

MyLocation.defaultProps = {
  onClick: () => {},
  userLocation: { place_name: 'My Location'}
}

export default MyLocation;