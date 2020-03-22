import {
  GET_PREFERED_CITIES_START,
  GET_PREFERED_CITIES_SUCCESS,
  GET_PREFERED_CITIES_ERROR,
  SET_PREFERED_CITY_START,
  SET_PREFERED_CITY_SUCCESS,
  SET_PREFERED_CITY_ERROR
} from "../types";

const initialState = {
  data: [],
  loading: false,
  message: "",
  id: "",
  lastSelected: ""
};

const preferedCitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PREFERED_CITIES_START: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_PREFERED_CITIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    }
    case GET_PREFERED_CITIES_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    }
    case SET_PREFERED_CITY_START: {
      return {
        ...state,
        id: action.payload.id,
        loading: true
      };
    }
    case SET_PREFERED_CITY_SUCCESS: {
      return {
        ...state,
        lastSelected: action.payload.lastSelected
      };
    }
    case SET_PREFERED_CITY_ERROR: {
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

export default preferedCitiesReducer;
