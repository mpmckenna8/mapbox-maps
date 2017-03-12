const defaultState = {
  // Mapbox Access Token
  mapboxAccessToken: 'pk.eyJ1IjoiYmVuamFtaW50ZCIsImEiOiJjaW83enIwNjYwMnB1dmlsejN6cDBzbm93In0.0ZOGwSLp8OjW6vCaEKYFng',
  // Map
  mapStyle: 'mapbox://styles/benjamintd/cj06a6mi5004p2sroifies8t9',
  mapCenter: [-122.4, 37.8],
  mapZoom: 10,
  // Search
  searchString: '',
  searchLocation: null,
  // Directions
  directionsFrom: null,
  directionsTo: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

  case 'SET_CENTER':
    return Object.assign({}, state, {
      mapCenter: action.coordinates
    });

  case 'SET_ZOOM':
    return Object.assign({}, state, {
      mapZoom: action.zoom
    });

  case 'WRITE_SEARCH':
    return Object.assign({}, state, {
      searchString: action.searchString
    });

  case 'SET_SEARCH_LOCATION':
    return Object.assign({}, state, {
      searchLocation: action.location
    });

  default:
    return state;
  }
};

export default reducer;
export {reducer, defaultState};
