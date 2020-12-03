import {
  SHOW_ALL_TAGS,
} from "../actions/types";

const initialState = [];

// eslint-disable-next-line
export default (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case SHOW_ALL_TAGS:
      return payload;
    default:
      return state;
  }
};
