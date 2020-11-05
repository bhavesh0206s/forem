import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_FORUM_POST,
  SHOW_FORUM_POST,
  SHOW_TOPIC_WISE_FORUM_POST,
  // ACCOUNT_DELETED,
} from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_FORUM_POST:
      return payload;
    case SHOW_TOPIC_WISE_FORUM_POST:
      return payload;
    default:
      return state;
  }
};
