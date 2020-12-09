import axios from "axios";
import {loading} from "./loading";
import { ADD_FORUM_POST, SHOW_TAG_POST,SHOW_FORUM_POST, SHOW_MY_FORUM_POST } from "./types";

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
    dispatch(loading(true));
    const res = await axios.get(`/api/forum/post`);
    dispatch({
      type: SHOW_FORUM_POST,
      payload: res.data,
    });
    dispatch(loading(false));
  } catch (err) {
    console.log("error from add post: ", err);
    dispatch(loading(false));
  }
};

export const fetchTagPost = (tag) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.get(`/api/forum/post/${tag}`);
    dispatch({
      type: SHOW_TAG_POST,
      payload: res.data,
    });
    dispatch(loading(false));
  } catch (err) {
    console.log("error from tag post: ", err);
    dispatch(loading(false));
  }
};

export const fetchMyForumPost = (id) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.get(`/api/forum/my-post/${id}`);
    dispatch({
      type: SHOW_MY_FORUM_POST,
      payload: res.data,
    });
    dispatch(loading(false));
  } catch (err) {
    console.log("error from add post: ", err);
    dispatch(loading(false));
  }
};

export const addReply = (reply, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(reply);
  console.log(body)
  try {
    await axios.post(`/api/forum/post/comment/${id}`, body, config);
    dispatch(fetchForumPost());
  } catch (err) {
    console.log("error from add post: ", err);
  }
};



