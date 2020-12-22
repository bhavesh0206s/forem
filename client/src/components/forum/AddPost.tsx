import { DownOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Menu, Dropdown, Tag, Alert } from 'antd';
import { useDebugValue, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { addForumPost, IAddForumPost } from '../../redux/actions/forum';
import { fetchTags } from '../../redux/actions/tags';
import { ModalPorps } from './TagMenu';
const { TextArea } = Input;

const errors = {
  content: 'Please add some content',
  title: 'Please add title to the post',
  tag: 'No Tag Selected'
}

interface IRootState {
  tags: Array<string>,
}

type ISelectedTags = string[];

const AddPost: React.FC<ModalPorps> = ({visibleModal, confirmLoading, setVisibleModal, setConfirmLoading}) => {

  const dispatch = useDispatch();
  
  const tags = useSelector((state: IRootState) => state.tags);

  const [selectedTags, setSelectedTags] = useState<ISelectedTags>([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState('')

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });

  const handleOk = () => {
    if(!title){
      setError(errors.title)
    }
    else if(!content){
      setError(errors.content)
    }
    else if(selectedTags.length === 0){
      setError(errors.tag);
    }else{
      setConfirmLoading(true);
      let details: IAddForumPost = {title, content, tags: selectedTags}
      dispatch(addForumPost(details))
      setConfirmLoading(false);
      setSuccess(true);
    }
  };

  const handleRemoveTag = (e: React.MouseEvent<HTMLElement, MouseEvent>) =>{
    const removeTag = e.target as HTMLElement;
    const newTags = selectedTags.filter(tag => tag !== removeTag.textContent);
    setSelectedTags(newTags)
  }

  const handleSelectedTags = (e : any) =>{
    let tag = e.key;
    if(selectedTags.indexOf(tag) === -1){
      setSelectedTags([...selectedTags, tag]);
      setError('');
    }
  }

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setTitle(e.target.value)
    setError('')
  }
  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    setContent(e.target.value)
    setError('')
  }

  const handleCancel = () => {
    setContent('');
    setTitle('');
    setError('')
    setSelectedTags([]);
    setVisibleModal(false);
    setSuccess(false)
  };

  const menu = (
    <Menu>
      {tags.map((tag, i) => (
        <Menu.Item key={tag} onClick={handleSelectedTags}>
          {tag}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    dispatch(fetchTags());
  },[])

  return (
    <Modal
      title={
        <Input 
          onChange={handleTitle}
          value={title}
          placeholder="New post title here..." 
          style={!isTabletOrMobileDevice ?  {width: '18em',fontSize: '1.5em'} : {width: '11em',fontSize: '1.1em'}}
        />
      }
      visible={visibleModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={700}
    >
      <TextArea 
        onChange={handleContent} 
        value={content}
        placeholder='Post content...' 
        rows={3} 
      />
      <Dropdown overlay={menu}>
        <Button style={{marginTop: 10}} >
          Select Tags <DownOutlined />
        </Button>
      </Dropdown>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {selectedTags.map((tag,id)=> (
          <Tag key={id} closable onClose={handleRemoveTag} style={{margin: 10}}>
            {tag}
          </Tag>
        ))}
      </div>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      )}
      {success && (
        <Alert message="Success" type="success" showIcon />
      )}
    </Modal>
  );
}
 
export default AddPost;