import { Comment, Avatar } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Loading';
import ReplyModal from './ReplyModal';

const MainPost = ({ children, showModal, data }) => (
  <Comment
    actions={
      [
        <span 
          onClick={() => data.content !== undefined ? showModal(data.content, data.name) : showModal(data.reply, data.name)} 
          key="comment-nested-reply-to">
            Reply
        </span>
      ]
    }
    author={<a>{data.name}</a>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt={data.name}
      />
    }
    content={
      <p>
        {data.content || data.reply}
      </p>
    }
  >
    {children}
  </Comment>
);

const Post = (props) => {
  const loading = useSelector(state => state.loading);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState('');
  
  const showModal = (content, name) => {
    setReplyingTo({
      name, content
    })
    setVisibleModal(true);
  };

  if(loading) (
    <Loading />
  )
  return (
    <div>
      <ReplyModal 
        confirmLoading={confirmLoading}
        visibleModal={visibleModal}  
        setConfirmLoading={setConfirmLoading}
        setVisibleModal={setVisibleModal}
        replyingTo={replyingTo}
        id={props.location.data._id}
      />
      <MainPost data={props.location.data} showModal={showModal}>
        {props.location.data.comments.map((comment) => (
          <MainPost data={comment} showModal={showModal}/>
        ))}
        {/* {props.location.data.comments[1].replyToComment.map((comment) => (
          <MainPost data={comment} showModal={showModal}/>
        ))} */}
      </MainPost>
    </div>
  );
}
 
export default Post;
