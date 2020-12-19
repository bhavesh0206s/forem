import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {RootState} from "./reducers";
// import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  RootState,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
