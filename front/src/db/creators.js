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
  SET_PREFERED_CITY_ERROR
} from "./types";
import Api from "../services/Services";

export const getCitiesStart = () => ({
  type: GET_CITIES_START
});

export const getCitiesSuccess = cities => ({
  type: GET_CITIES_SUCCESS,
  payload: {
    cities
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
    cities
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

export const getCities = () => async dispatch => {
  dispatch(getCitiesStart());
  try {
    const { data, status, statusText } = await Api.cities.fetch();
    if (status === 200) {
      dispatch(getCitiesSuccess(data.data));
    } else {
      dispatch(getCitiesError(statusText));
    }
  } catch (err) {
    dispatch(getCitiesError(err.toString()));
  }
};

export const getCitiesByFilter = filter => async dispatch => {
  dispatch(getFilterCitiesStart());
  try {
    const { data, status, statusText } = await Api.cities.fetchByFilter(
      filter.toString()
    );
    if (status === 200) {
      dispatch(getFilterCitiesSuccess(data.data));
    } else {
      dispatch(getFilterCitiesError(statusText));
    }
  } catch (err) {
    dispatch(getFilterCitiesError(err.toString()));
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
    dispatch(getPreferedCitiesError(err.toString()));
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
    dispatch(setCityError(err.toString()));
  }
};
