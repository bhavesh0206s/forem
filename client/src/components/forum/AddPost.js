import { DownOutlined } from '@ant-design/icons';
import { Modal, Button, Input, Menu, Dropdown, Tag } from 'antd';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
const { TextArea } = Input;

const AddPost = ({visibleModal, confirmLoading, setVisibleModal, setConfirmLoading}) => {

  const [selectedTags, setSelectedTags] = useState([])

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });


  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleRemoveTag = (e) =>{
    const removeTag = e.target.textContent;
    const newTags = selectedTags.filter(tag => tag !== removeTag);
    setSelectedTags(newTags)
  }

  const handleSelectedTags = (e) =>{
    setSelectedTags([...selectedTags, e.target.textContent])
  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisibleModal(false);
  };

  const topics = (
    <Menu>
      <Menu.Item >
        <span onClick={handleSelectedTags}>1st menu item</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={handleSelectedTags}>2st menu item</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={handleSelectedTags}>3st menu item</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Modal
      title={
        <Input 
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
      <TextArea placeholder='Post content...' rows={5} />
      <Dropdown overlay={topics}>
        <Button style={{marginTop: 10}} >
          Select Tags <DownOutlined />
        </Button>
      </Dropdown>
      <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
        {selectedTags.map(tag => (
          <Tag closable onClose={handleRemoveTag} style={{margin: 10}}>
            {tag}
          </Tag>
        ))}
      </div>
    </Modal>
  );
}
 
export default AddPost;