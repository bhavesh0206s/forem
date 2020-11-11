import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
  // CLEAR_PROFILE,
} from './types'
import axios from 'axios'
// import { setAlert } from "./alert";

// Logout / Clear Profile
export const logout = () => dispatch => {
  // dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT })
}
