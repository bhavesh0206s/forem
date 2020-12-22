import {
  LOADING,
} from "../actions/types";
import { IActionType } from "./forum";

const initialState = false
// eslint-disable-next-line 
export default (state = initialState, action: IActionType) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return payload
    default:
      return state;
  }
};
