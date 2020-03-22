import {
  GET_CITIES_START,
  GET_CITIES_SUCCESS,
  GET_CITIES_ERROR,
  GET_FILTER_CITIES_START,
  GET_FILTER_CITIES_SUCCESS,
  GET_FILTER_CITIES_ERROR,
  CLEAN_ERROR_MESSAGE
} from "../types";

const initialState = {
  data: [],
  loading: false,
  message: "",
  nextLink: "",
  backLink: ""
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
        data: action.payload.cities,
        nextLink: action.payload.nextLink,
        backLink: action.payload.backLink
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
        data: action.payload.cities,
        nextLink: action.payload.nextLink,
        backLink: action.payload.backLink
      };
    }
    case GET_FILTER_CITIES_ERROR: {
      return {
        ...state,
        loading: false,
        message: action.payload.message
      };
    }
    case CLEAN_ERROR_MESSAGE: {
      return {
        ...state,
        message: action.payload.message
      };
    }
    default:
      return state;
  }
};

export default citiesReducer;
