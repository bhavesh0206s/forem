import {
  LOGOUT,
  FETCH_USER,
  // ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  user: null,
};
// eslint-disable-next-line 
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER:
      return {
        ...state,
        isAuthenticated: payload ? true : false,
        user: payload || false,
      };
    case LOGOUT:
      return {
        ...state
      };
    default:
      return state;
  }
};
