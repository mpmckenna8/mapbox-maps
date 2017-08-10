import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContextMenu from './ContextMenu';
import Map from './Map';
import Search from './Search';
import Directions from './Directions';
import StyleSwitch from './StyleSwitch';
import TrafficSwitch from './TrafficSwitch';
import {setStateValues, setStateFromURL} from '../actions'

class App extends Component {

  componentWillMount() {
    this.props.setStateFromURL();
  }

  render() {
    var moveOnLoad = this.props.url
      .split('/')
      .map(e => !e.startsWith('+'))
      .reduce((a, b) => (a && b), true);

    //  console.log(this.props)

    return (
      <div className='root'>
        <Map moveOnLoad={moveOnLoad}/>


        <div className='relative m12 m24-mm w420-mm flex-parent flex-parent--column directionsDiv'>

          {
            (this.props.mode === 'directions')
            ?( <div className="routeDetailMaxMin absolute left flex-parent flex-parent--row "
                        onClick={ (e) => {

                          console.log('need to minimize the route info', this.props);
                          if(this.props.routeDisplay) {
                            console.log(this.props)

                            let setobj = this.props["setStateValues"]
                            setobj(  {routeDisplay:false}  )
                          }
                          else {
                            console.log(this.props)

                            this.props.setStateValues({routeDisplay:true})
                          }
                            //console.log(this.props)

                        }}>
                        <span className={(this.props.routeDisplay === true) ? 'minimizer' : 'maximizer'} >

                        {
                          (this.props.routeDisplay == true) ?'-':'+'
                        }

                      </span>
                    </div>

                  )
                  : null

          }

          {

            (this.props.mode === 'directions' && this.props.routeDisplay == true)
            ? <Directions/>
            : <Search/>
          }
        </div>
        {
          (window.innerWidth > 640 && this.props.routeDisplay)
          ? <div className='absolute bottom mb36 mx12 bg-white shadow-darken25 px3 py3'>
              <div className='relative'>
                <TrafficSwitch/>
              </div>
              <div className='style-switch'>
                <StyleSwitch/>
              </div>
            </div>
          : null
        }
        {
          (this.props.contextMenuActive === true)
          ? <ContextMenu/>
          : null
        }
      </div>
    );
  }
}

App.propTypes = {
  contextMenuActive: PropTypes.bool,
  mode: PropTypes.string,
  route: PropTypes.object,
  routeStatus: PropTypes.string,
  setStateFromURL: PropTypes.func,
  url: PropTypes.string,
  routeDisplay: PropTypes.bool,
  dispatch:PropTypes.func,
  setStateValues:PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    contextMenuActive: state.app.contextMenuActive,
    mode: state.app.mode,
    route: state.app.route,
    routeStatus: state.app.routeStatus,
    url: state.router.location.pathname,
    routeDisplay: state.app.routeDisplay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStateFromURL: () => dispatch(setStateFromURL()),
    setStateValues: (obj) => dispatch(setStateValues(obj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
