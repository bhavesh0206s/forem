import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar, Card, Divider } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const PostCard = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const [postHeading, setPostHeading] = useState("First post of the app")

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };


  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>
  ];

  const username = 'bhavesh'

  return (
    <div>

      <Card hoverable style={{margin: 10}}>
        <Comment
          actions={actions}
          author={<a>Han Solo</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <div>
              <Link style={{color: 'inherit'}} to={`/home/${username}/${postHeading.toLowerCase().split(' ').join('-')}`}>
                <h1>Heading Heading</h1>
                <p>
                  We supply a series of design principles, practical patterns and high quality design
                  resources (Sketch and Axure), to help people create their product prototypes beautifully
                  and efficiently.
                </p>
              </Link>
              <div style={{display: 'flex', padding: 10}}>
                <p style={{padding: 5, color: 'grey'}}>#<span>javascript</span></p>
                <p style={{padding: 5, color: 'grey'}}>#<span>javascript</span></p>
              </div>
            </div>
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </Card>
      <Divider />
    </div>
  );
};

export default PostCard;