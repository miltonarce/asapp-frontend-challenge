// eslint-disable-next-line object-curly-newline
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import citiesReducer from "./reducers";

export default createStore(
  combineReducers({ data: citiesReducer }),
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
    applyMiddleware(thunk)
  )
);
