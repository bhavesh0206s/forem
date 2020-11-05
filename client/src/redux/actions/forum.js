import axios from "axios";
import { ADD_FORUM_POST, SHOW_FORUM_POST, SHOW_TOPIC_WISE_FORUM_POST } from "./types";

export const addForumPost = (details, type) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(details);
  console.log(body, type)
  try {
    const res = await axios.post(`http://127.0.0.1:5000/api/forum/post/${type}`, body, config);

    dispatch(fetchAllForumPost());

  } catch (err) {
    console.log("error from add post: ", err);
  }
};

export const fetchAllForumPost = (type) => async (dispatch) => {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/forum/post');

    dispatch({
      type: SHOW_FORUM_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log("error from add post: ", err);
  }
};

export const fetchTopicWiseForumPost = (type) => async (dispatch) => {
  try {
    const res = await axios.get(`http://127.0.0.1:5000/api/forum/post/${type}`);
    console.log(res.data)
    dispatch({
      type: SHOW_TOPIC_WISE_FORUM_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log("error from add post: ", err);
  }
};