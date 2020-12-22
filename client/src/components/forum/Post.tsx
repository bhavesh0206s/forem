import { Comment, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForumPost, fetchReply } from '../../redux/actions/forum';
import Loading from '../Loading';
import ReplyModal from './ReplyModal';

interface PostProps {
  children?: () => JSX.Element | null,
  showModal : (content: string, name: string, avatar: string) => void,
  data: {
    content: string,
    name: string,
    avatar: string,
    reply: string,
    replyingTo: {
      name: string;
      avatar: string;
      content: string;
  }
  },
}

const MainPost: React.FC<PostProps> = ({ children, showModal, data }) => {
  return(
    <Comment
      style={{backgroundColor: 'white'}}
      actions={
        [
          <span 
            onClick={() => showModal(data.content, data.name, data.avatar)} 
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
          {data.content}
        </p>
      }
    >
      {children}
    </Comment>
);}

const SubReply: React.FC<PostProps> = ({ children, showModal, data }) => {
  return(
  <Comment 
    className='reply__section'
    style={{backgroundColor: 'aliceblue'}}
    author={
      <div>
        {data.replyingTo.name}
      </div>
    }
    avatar={
      <Avatar
        src={data.replyingTo.avatar}
        alt={data.replyingTo.name}
      />
    }
    content={
      <div>
        {data.replyingTo.content}
      </div>
    }
  >
    <Comment
      style={{backgroundColor: 'white'}}
      actions={
        [
          <span 
            onClick={() =>showModal(data.reply, data.name, data.avatar)} 
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
          {data.reply}
        </p>
      }
    >
      {children}
    </Comment>
  </Comment>
);}


interface IRootState {
  loading: boolean,
  auth: {
    isAuthenticated: boolean
  },
  forum: {
    comments: any,
    post: any
  },
}

interface IReplyinTo{
  name: string,
  content: string,
  avatar: string,
}


const Post: React.FC = (props: any) => {
  const dispatch = useDispatch();

  const {isAuthenticated, loading , forumPostComments, forumPost } = useSelector((state: IRootState)=> ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.loading,
    forumPostComments: state.forum.comments,
    forumPost: state.forum.post
  }))

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [replyingTo, setReplyingTo] = useState<IReplyinTo | string>('');
  const [postId, setPostId] = useState<string | null>('');

  const showModal = (content: string, name: string, avatar: string='nothing') => {
    setReplyingTo({
      name, content, avatar
    })
    setVisibleModal(isAuthenticated ? true: false);
  };

  useEffect(() => {
    if(!props.location.data){  
      const id: string | null = localStorage.getItem("id");
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
  return (
    <div>
      {isAuthenticated && (
        <ReplyModal 
          confirmLoading={confirmLoading}
          visibleModal={visibleModal}  
          setConfirmLoading={setConfirmLoading}
          setVisibleModal={setVisibleModal}
          replyingTo={replyingTo}
          isAuthenticated={isAuthenticated}
          id={!props.location.data ? postId : props.location.data._id}
        />
      )}
      <MainPost data={forumPost} showModal={showModal}>
        {forumPostComments.map((comment: any) => (
          <SubReply data={comment} showModal={showModal}/>
        ))}
      </MainPost>
    </div>
  );
}
 
export default Post;
