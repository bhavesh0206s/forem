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
import setAuthToken from '../setAuthToken'

// Load User
export const loadUser = type => async dispatch => {
  // set header
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get(`http://127.0.0.1:5000/api/login/${type}`)

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    console.log('there is an error userdata-loading')
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Regiseter user
export const register = formdata => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log(formdata)
  const body = JSON.stringify(formdata)
  console.log(body)
  let requrl
  if (formdata.type === 'student') {
    requrl = 'http://localhost:5000/api/signup/student'
  } else {
    requrl = 'http://127.0.0.1:5000/api/signup/teacher'
  }
  try {
    const res = await axios.post(requrl, body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser(formdata.type))
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors // This errors will come from backend that we setted as errors.array

    if (errors) {
      errors.forEach(error => {
        // dispatch(setAlert(error.msg, "danger"));
        console.log(error)
      })
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login user
export const login = (email, password, type) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password, type })
  console.log(body, type)
  try {
    const res = await axios.post(
      `http://127.0.0.1:5000/api/login/${type}`,
      body,
      config
    )
    console.log(res.data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser(type))
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => {
        // dispatch(setAlert(error.msg, "danger"));
        console.log(error)
      })
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
  // dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT })
}
