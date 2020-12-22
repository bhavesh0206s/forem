import {
  SHOW_ALL_TAGS,
} from "../actions/types";
import { IActionType } from "./forum";

const initialState: Array<any> = [];

// eslint-disable-next-line
export default (state = initialState, action: IActionType) => {

  const { type, payload } = action;

  switch (type) {
    case SHOW_ALL_TAGS:
      return payload;
    default:
      return state;
  }
};
