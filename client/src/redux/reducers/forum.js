import {
  SHOW_FORUM_POST, SHOW_MY_FORUM_POST, SHOW_REPLY, SHOW_TAG_POST, SHOW_FORUM_POSTS
} from "../actions/types";

const initialState = {
  posts: [],
  comments: [],
  post: []
};

// eslint-disable-next-line
export default (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case SHOW_FORUM_POSTS:
      return {
        ...state,
        posts: payload
      };
    case SHOW_FORUM_POST:
      return {
        ...state,
        post: payload
      };
    case SHOW_MY_FORUM_POST:
      return {
        ...state,
        posts: payload
      };
    case SHOW_TAG_POST:
      return {
        ...state,
        posts: payload
      };
    case SHOW_REPLY:
      return {
        ...state,
        comments: payload
      };
    default:
      return state;
  }
};
