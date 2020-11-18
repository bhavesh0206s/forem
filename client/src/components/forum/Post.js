import { Comment, Avatar } from 'antd';
import { useState } from 'react';
import ReplyModal from './ReplyModal';

const MainPost = ({ children, showModal }) => (
  <Comment
    actions={[<span onClick={showModal} key="comment-nested-reply-to">Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    }
    content={
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
);

const Post = ({match}) => {
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
      <MainPost showModal={showModal}>
        <MainPost showModal={showModal}>
          <MainPost showModal={showModal}/>
          <MainPost showModal={showModal}/>
        </MainPost>
      </MainPost>
    </div>
  );
}
 
export default Post;
