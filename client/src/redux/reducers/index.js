import { combineReducers } from "redux";
// import alert from "./alert";
import auth from "./auth";
import forum from "./forum";
import tags from './tags'

// import profile from "./profile";
// import post from "./post";

export default combineReducers({
  auth,
  forum,
  tags
});
