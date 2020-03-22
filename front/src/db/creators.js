import {
  GET_CITIES_START,
  GET_CITIES_SUCCESS,
  GET_CITIES_ERROR,
  GET_FILTER_CITIES_START,
  GET_FILTER_CITIES_SUCCESS,
  GET_FILTER_CITIES_ERROR,
  GET_PREFERED_CITIES_START,
  GET_PREFERED_CITIES_SUCCESS,
  GET_PREFERED_CITIES_ERROR,
  SET_PREFERED_CITY_START,
  SET_PREFERED_CITY_SUCCESS,
  SET_PREFERED_CITY_ERROR,
  CLEAN_ERROR_MESSAGE
} from "./types";
import Api from "../services/Services";

export const getCitiesStart = () => ({
  type: GET_CITIES_START
});

export const getCitiesSuccess = cities => ({
  type: GET_CITIES_SUCCESS,
  payload: {
    cities: cities.data,
    nextLink: cities.links.next || "",
    backLink: cities.links.prev || ""
  }
});

export const getCitiesError = message => ({
  type: GET_CITIES_ERROR,
  payload: {
    message
  }
});

export const getPreferedCitiesStart = () => ({
  type: GET_PREFERED_CITIES_START
});

export const getPreferedCitiesSuccess = data => ({
  type: GET_PREFERED_CITIES_SUCCESS,
  payload: {
    data
  }
});

export const getPreferedCitiesError = message => ({
  type: GET_PREFERED_CITIES_ERROR,
  payload: {
    message
  }
});

export const getFilterCitiesStart = () => ({
  type: GET_FILTER_CITIES_START
});

export const getFilterCitiesSuccess = cities => ({
  type: GET_FILTER_CITIES_SUCCESS,
  payload: {
    cities: cities.data,
    nextLink: cities.links.next || "",
    backLink: cities.links.prev || ""
  }
});

export const getFilterCitiesError = message => ({
  type: GET_FILTER_CITIES_ERROR,
  payload: {
    message
  }
});

export const setCityStart = id => ({
  type: SET_PREFERED_CITY_START,
  payload: {
    id
  }
});

export const setCitySuccess = lastSelected => ({
  type: SET_PREFERED_CITY_SUCCESS,
  payload: {
    lastSelected
  }
});

export const setCityError = message => ({
  type: SET_PREFERED_CITY_ERROR,
  payload: {
    message
  }
});

export const cleanErrorMessage = () => ({
  type: CLEAN_ERROR_MESSAGE,
  payload: {
    message: ""
  }
});

export const getCities = link => async dispatch => {
  dispatch(getCitiesStart());
  try {
    const { data, status, statusText } = await Api.cities.fetch(link);
    if (status === 200) {
      dispatch(getCitiesSuccess(data));
    } else {
      dispatch(getCitiesError(statusText));
    }
  } catch (err) {
    dispatch(getCitiesError("Something went wrong, please try again."));
  }
};

export const getCitiesByFilter = filter => async dispatch => {
  dispatch(getFilterCitiesStart());
  try {
    const { data, status, statusText } = await Api.cities.fetchByFilter(
      filter.toString()
    );
    if (status === 200) {
      dispatch(getFilterCitiesSuccess(data));
    } else {
      dispatch(getFilterCitiesError(statusText));
    }
  } catch (err) {
    dispatch(getFilterCitiesError("Something went wrong, please try again."));
  }
};

export const getPreferedCities = () => async dispatch => {
  dispatch(getPreferedCitiesStart());
  try {
    const { data, status, statusText } = await Api.cities.fetchPreferences();
    if (status === 200) {
      dispatch(getPreferedCitiesSuccess(data.data));
    } else {
      dispatch(getPreferedCitiesError(statusText));
    }
  } catch (err) {
    dispatch(getPreferedCitiesError("Something went wrong, please try again."));
  }
};

export const setPreferedCity = city => async dispatch => {
  dispatch(setCityStart(city.geonameid));
  try {
    const { status, statusText } = await Api.cities.selectCity(city);
    if (status === 204) {
      dispatch(getPreferedCities());
      dispatch(setCitySuccess(city.name));
    } else {
      dispatch(setCityError(statusText));
    }
  } catch (err) {
    dispatch(setCityError("Something went wrong, please try again."));
  }
};
