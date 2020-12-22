import {
  LOGOUT,
  FETCH_USER,
  // ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  user: null,
};

interface IFetchUser{
  type: string,
  payload: any
}

interface ILogout{
  type: string,
  payload:{
    isAuthenticated: null,
    user: null
  }
}

type ActionType = IFetchUser | ILogout

// eslint-disable-next-line 
export default (state = initialState, action: ActionType) => {
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
