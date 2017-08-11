// max and min button to be kind of like the close button.

import PropTypes from 'prop-types';
import React, {Component} from 'react';

class MaxMinButton extends Component {
  render() {

    return (
      <div   className='maxMinButton absolute left flex-parent flex-parent--center-cross flex-parent--center-main w42 h42 cursor-pointer minmaxbut'
      onClick={this.props.onClick}>
        <svg className='icon icon--l color-lighten50' ><use xlinkHref={ this.props.routeDisplay ? '#icon-minus' : '#icon-plus' } ></use></svg>
      </div>
    )
  }
}

MaxMinButton.propTypes = {

  color: PropTypes.string,
  large: PropTypes.bool,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  routeDisplay: PropTypes.bool
};

MaxMinButton.defaultProps = {
  color: 'color-gray',
  large: false,
  onClick: () => { console.log('On minmax button and something else probably' +
   'should have happend') },
  show: true,
  routeDisplay: true

};


export default MaxMinButton;
