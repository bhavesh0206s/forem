import axios from "axios";
import {loading} from "./loading";
import { SHOW_REPLY, SHOW_TAG_POST,SHOW_FORUM_POST, SHOW_FORUM_POSTS,SHOW_MY_FORUM_POST } from "./types";

export const addForumPost = (details) => async (dispatch) => {
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

export const fetchAllForumPosts = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.get(`/api/forum/post`);
    dispatch({
      type: SHOW_FORUM_POSTS,
      payload: res.data,
    });
    dispatch(loading(false));
  } catch (err) {
    console.log("error from all posts: ", err);
    dispatch(loading(false));
  }
};

export const fetchForumPost = (id) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.get(`/api/forum/post/${id}`);
    dispatch({
      type: SHOW_FORUM_POST,
      payload: res.data
    })
    dispatch(loading(false));
  } catch (err) {
    console.log("error from post: ", err);
    dispatch(loading(false));
  }
};

export const fetchTagPost = (tag) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.get(`/api/forum/post/tag/${tag}`);
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
  console.log(reply)
  try {
    await axios.post(`/api/forum/post/comment/${id}`, body, config);
    dispatch(fetchReply(id))
  } catch (err) {
    console.log("error from add reply: ", err);
  }
};

export const fetchReply = (id) => async (dispatch) => {
  try {
    dispatch(loading(true));
    const res = await axios.get(`/api/forum/post/comment/${id}`);
    dispatch({
      type: SHOW_REPLY,
      payload: res.data
    })
    dispatch(loading(false));
  } catch (err) {
    console.log("error from fetch Reply: ", err);
    dispatch(loading(false));
  }
};



