import {
  GET_CITIES_START,
  GET_CITIES_SUCCESS,
  GET_CITIES_ERROR,
  GET_FILTER_CITIES_START,
  GET_FILTER_CITIES_SUCCESS,
  GET_FILTER_CITIES_ERROR
} from "./types";

const initialState = {
  cities: [],
  loading: false,
  message: ""
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES_START: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_CITIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        cities: action.payload.cities
      };
    }
    case GET_CITIES_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    }
    case GET_FILTER_CITIES_START: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_FILTER_CITIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        cities: action.payload.cities
      };
    }
    case GET_FILTER_CITIES_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    }
    default:
      return state;
  }
};

export default citiesReducer;
