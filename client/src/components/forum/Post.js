import { Comment, Avatar } from 'antd';
import { useState } from 'react';
import ReplyModal from './ReplyModal';

const MainPost = ({ children, showModal, data }) => (
  <Comment
    actions={[<span onClick={showModal} key="comment-nested-reply-to">Reply to</span>]}
    author={<a>{data.name}</a>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt={data.name}
      />
    }
    content={
      <p>
        {data.content}
      </p>
    }
  >
    {children}
  </Comment>
);

const Post = (props) => {
   
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  
  const showModal = () => {
    setVisibleModal(true);
  };

  return (
    <div>
      <ReplyModal 
        confirmLoading={confirmLoading}
        visibleModal={visibleModal}  
        setConfirmLoading={setConfirmLoading}
        setVisibleModal={setVisibleModal}
      />
      <MainPost data={props.location.data} showModal={showModal}>
      </MainPost>
    </div>
  );
}
 
export default Post;
