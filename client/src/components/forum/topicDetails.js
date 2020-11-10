import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchTopicWiseForumPost } from "../../redux/actions/forum";
import ForumPost from "./forumPost";

const TopicDetails = ({ match }) => {

  const forumTopicPosts = useSelector(state => state.forum);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(match.params.topics)
    dispatch(fetchTopicWiseForumPost(match.params.topics))
  }, [])
  console.log(forumTopicPosts)
  return (
    <Fragment>
      {forumTopicPosts.map((item) => (
        <ForumPost item={item}/>
      ))}
    </Fragment>
  );
};

export default TopicDetails;
