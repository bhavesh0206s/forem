import {
  LOGOUT,
  FETCH_USER
} from './types'
import axios from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
// import { setAlert } from "./alert";

export const fetchUser =  (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({
      type: FETCH_USER,
      payload: res.data
    })
  } catch (error) {
    
  }
}

export const saveUsernameAndBio = (username, bio) => async dispatch =>{
  try {
    const res = await axios.post('/api/auth/signup-form', {username, bio});
    console.log(res.data);
  } catch (error) {
    console.log('error from saveUsernameAndBio: ', error)
  }
}

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT })
}
