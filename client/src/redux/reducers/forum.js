import {
  SHOW_FORUM_POST, SHOW_MY_FORUM_POST, SHOW_TAG_POST,
} from "../actions/types";

const initialState = [];

// eslint-disable-next-line
export default (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case SHOW_FORUM_POST:
      return payload;
    case SHOW_MY_FORUM_POST:
      return payload;
    case SHOW_TAG_POST:
      return payload;
    default:
      return state;
  }
};
