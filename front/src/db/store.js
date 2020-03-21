// eslint-disable-next-line object-curly-newline
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import citiesReducer from "./reducers/citiesReducers";
import preferedCitiesReducers from "./reducers/preferedCitiesReducers";

export default createStore(
  combineReducers({
    cities: citiesReducer,
    preferedCities: preferedCitiesReducers
  }),
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
    applyMiddleware(thunk)
  )
);
