import axios from "axios";
import { ADD_FORUM_POST, SHOW_ALL_TAGS,SHOW_FORUM_POST, SHOW_MY_FORUM_POST } from "./types";

export const addForumPost = (details, type) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(details);
  console.log(body)
  try {
    await axios.post(`/api/forum/post`, body, config);
    
    dispatch(fetchForumPost());

  } catch (err) {
    console.log("error from add post: ", err);
  }
};

export const fetchForumPost = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/forum/post`);
    dispatch({
      type: SHOW_FORUM_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log("error from add post: ", err);
  }
};

export const fetchMyForumPost = (id) => async (dispatch) => {
  try {

    const res = await axios.get(`/api/forum/my-post/${id}`);
    dispatch({
      type: SHOW_MY_FORUM_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log("error from add post: ", err);
  }
};

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

