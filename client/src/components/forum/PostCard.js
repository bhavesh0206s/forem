import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar, Card, Divider } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../Loading';

const PostCard = (props) => {

  const loading = useSelector(state => state.loading);

  const [likes, setLikes] = useState(0);

  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setAction('liked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{props.likes.length}</span>
      </span>
    </Tooltip>
  ];
  if(loading){
    return <Loading />
  }
  return (
    <div>
      <Card hoverable style={{margin: 10}}>
        <Comment
          actions={actions}
          author={<a>{props.name}</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt={props.name}
            />
          }
          content={
            <div>
              <Link style={{color: 'inherit'}} 
                to={{
                  pathname: `/home/${props.username}/${props.title.toLowerCase().split(' ').join('-')}`,
                  data: props
                }}
              >
                <h1 style={{fontSize: '1.5em'}}>{props.title}</h1>
                <p>
                  {props.content}
                </p>
              </Link>
              <div style={{display: 'flex', padding: 10}}>
                {props.tags.map((tag, id) => (
                  <p key={id} style={{padding: 5, color: 'grey'}}>#<span>{tag}</span></p>
                ))}
              </div>
            </div>
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(props.date).format('Do MMMM YYYY, h:mm a')}</span>
            </Tooltip>
          }
        />
      </Card>
      <Divider />
    </div>
  );
};

export default PostCard;