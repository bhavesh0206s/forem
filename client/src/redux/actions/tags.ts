import axios from "axios";
import { SHOW_ALL_TAGS } from "./types";
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers'

export const addTag = (tag: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(tag);
  try {
    await axios.post(`/api/forum/tag`, body, config);
    dispatch(fetchTags())
  } catch (err) {
    console.log("error from add tag: ", err);
  }
};

export const fetchTags = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const res = await axios.get(`/api/forum/tag`);
    dispatch({
      type: SHOW_ALL_TAGS,
      payload: res.data,
    });
  } catch (err) {
    console.log("error from fetch tags: ", err);
  }
};