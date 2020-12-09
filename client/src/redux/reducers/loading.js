import {
  LOADING,
} from "../actions/types";

const initialState = false
// eslint-disable-next-line 
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return payload
    default:
      return state;
  }
};
