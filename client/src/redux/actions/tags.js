import axios from "axios";
import { SHOW_ALL_TAGS } from "./types";

export const addTag = (tag) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(tag);
  console.log(body)
  try {
    await axios.post(`/api/forum/tag`, body, config);
    dispatch(fetchTags())
  } catch (err) {
    console.log("error from add tag: ", err);
  }
};

export const fetchTags = () => async (dispatch) => {
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