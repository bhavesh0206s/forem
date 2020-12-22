import axios from "axios";
import {loading} from "./loading";
import { SHOW_REPLY, SHOW_TAG_POST,SHOW_FORUM_POST, SHOW_FORUM_POSTS,SHOW_MY_FORUM_POST } from "./types";
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers'

export interface IAddForumPost {
  title: string,
  content: string
  tags: Array<string>,
}

export const addForumPost = (details: IAddForumPost): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(details);

  try {
    await axios.post(`/api/forum/post`, body, config);
    
    dispatch(fetchAllForumPosts());

  } catch (err) {
    console.log("error from add post: ", err);
  }
};

export const fetchAllForumPosts = (): ThunkAction<void, RootState, unknown, Action<string>>  => async (dispatch) => {
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

export const fetchForumPost = (id: string | null): ThunkAction<void, RootState, unknown, Action<string>>  => async (dispatch) => {
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

export const fetchTagPost = (tag: string): ThunkAction<void, RootState, unknown, Action<string>>  => async (dispatch) => {
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

export const fetchMyForumPost = (id: string) : ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
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

interface IAddReply{
  reply: string
  replyingTo : {
    name: string | undefined, 
    content: string, 
    avatar: string
  } | undefined
}

export const addReply = (reply: IAddReply, id: string) : ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(reply);

  try {
    await axios.post(`/api/forum/post/comment/${id}`, body, config);
    dispatch(fetchReply(id))
  } catch (err) {
    console.log("error from add reply: ", err);
  }
};

export const fetchReply = (id: string | null): ThunkAction<void, RootState, unknown, Action<string>>  => async (dispatch) => {
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



