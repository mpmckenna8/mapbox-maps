import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import RouteElevation from './RouteElevation';
import {setStateValues} from '../actions'

class RoutePanel extends Component {
  render() {
    return (
      <div className='relative mt6 bg-white w-full w420-mm hmin42 hmin48-mm
        shadow-darken25 flex-parent flex-parent--column flex-parent--center-main'>
        {this.routeInfo()}
        {
          (this.props.modality === 'bike')
          ? <RouteElevation
              route={this.props.route}
              accessToken={this.props.mapboxAccessToken}
              displayStatus={this.props.routeDisplay}
            />
          : null
        }
      </div>
    );
  }

  routeInfo() {

  //  console.log('current this.props.route = ,', this.props.route)
    if (this.props.route) {
      return (
        <div className='flex-parent flex-parent--row flex-parent--center-cross'>
          <div className='w48 hmin48 flex-parent flex-parent--center-main flex-parent--center-cross'>
            <svg className='icon color-gray'><use xlinkHref={'#icon-' + this.props.modality}></use></svg>
          </div>
          <div className='bottom pr12'>
            {this.secondsToReadableTime(this.props.route.duration)}
            {this.props.modality === 'car' ? ' with current traffic' : ''}
          </div>
          <div className='bottom color-gray'>
            {(this.props.route.distance / 1000).toFixed(1)} km
          </div>
        </div>
      );
    } else if (this.props.routeStatus === 'pending') {
      return <div className='loading loading--s'/>;
    } else if (this.props.routeStatus === 'error') {
      return <div className='txt-s txt-m-mm animation-subtle-shake px18'>Sorry, no route found for these locations.</div>;
    } else return null;
  }



  secondsToReadableTime(duration) {
    let minutes = Math.max(1, Math.round(duration / 60));

    let hours = Math.floor(minutes / 60);
    minutes -= 60 * hours;

    let days = Math.floor(hours / 24);
    hours -= 24 * days;

    const daysString = (days > 0) ? `${days} day${days > 1 ? 's,' : ','} ` : '';
    const hoursString = (hours > 0) ? `${hours} hour${hours > 1 ? 's and' : ' and'} ` : '';
    const minutesString = `${minutes} minute${minutes > 1 ? 's' : ''} `;
    return daysString + hoursString + minutesString;
  }
}

RoutePanel.propTypes = {
  mapboxAccessToken: PropTypes.string,
  modality: PropTypes.string,
  route: PropTypes.object,
  routeStatus: PropTypes.string.isRequired,
  routeDisplay: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    mapboxAccessToken: state.app.mapboxAccessToken,
    modality: state.app.modality,
    route: state.app.route,
    routeStatus: state.app.routeStatus,
    routeDisplay: state.app.routeDisplay
  };
};

export {RoutePanel};
export default connect(mapStateToProps)(RoutePanel);
