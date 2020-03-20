import {
  GET_CITIES_START,
  GET_CITIES_SUCCESS,
  GET_CITIES_ERROR,
  GET_FILTER_CITIES_START,
  GET_FILTER_CITIES_SUCCESS,
  GET_FILTER_CITIES_ERROR
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
