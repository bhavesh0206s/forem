import { Comment, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForumPost, fetchReply } from '../../redux/actions/forum';
import Loading from '../Loading';
import ReplyModal from './ReplyModal';

const MainPost = ({ children, showModal, data }) => {
  return(
  <Comment 
    className={data.content === undefined ? 'reply__section': null}
    style={{backgroundColor: data.content === undefined ? 'aliceblue'  : null}}
    author={
      <div>
        {data.content === undefined && data.replyingTo.name}
      </div>
    }
    avatar={
      <div>
        {data.content === undefined && (
          <Avatar
            src={data.replyingTo.avatar}
            alt={data.replyingTo.name}
          />
        )}
      </div>
    }
    content={
      <div>
        {data.content === undefined && data.replyingTo.content}
      </div>
    }
  >
    <Comment
      style={{backgroundColor: 'white'}}
      actions={
        [
          <span 
            onClick={() => data.content !== undefined ? showModal(data.content, data.name, data.avatar) : showModal(data.reply, data.name, data.avatar)} 
            key="comment-nested-reply-to">
              Reply
          </span>
        ]
      }
      author={<a>{data.name}</a>}
      avatar={
        <Avatar
          src={data.avatar}
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
  </Comment>
);}

const Post = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);
  const forumPostComments = useSelector(state => state.forum.comments);
  const forumPost = useSelector(state => state.forum.post)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState('');
  const [postId, setPostId] = useState('');
  
  const showModal = (content, name, avatar='nothing') => {
    setReplyingTo({
      name, content, avatar
    })
    setVisibleModal(true);
  };

  useEffect(() => {
    console.log(props.location.data)
    if(!props.location.data){  
      const id = localStorage.getItem("id");
      console.log(id)
      setPostId(id)
      dispatch(fetchReply(id));
      dispatch(fetchForumPost(id));
    }else{
      dispatch(fetchReply(props.location.data._id));
      dispatch(fetchForumPost(props.location.data._id))
      localStorage.setItem("id", props.location.data._id);
    }
  }, [])

  if(loading){ 
    return <Loading />
  }
  console.log(forumPost)
  return (
    <div>
      <ReplyModal 
        confirmLoading={confirmLoading}
        visibleModal={visibleModal}  
        setConfirmLoading={setConfirmLoading}
        setVisibleModal={setVisibleModal}
        replyingTo={replyingTo}
        id={!props.location.data ? postId : props.location.data._id}
      />
      <MainPost data={forumPost} showModal={showModal}>
        {forumPostComments.map((comment) => (
          <MainPost data={comment} showModal={showModal}/>
        ))}
      </MainPost>
    </div>
  );
}
 
export default Post;
