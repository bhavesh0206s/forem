import { Layout, Menu, Icon, Breadcrumb, Button, Alert, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import Modal from 'antd/lib/modal/Modal';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { fetchTagPost } from '../../redux/actions/forum';
import { addTag, fetchTags } from '../../redux/actions/tags';
import './forum.css';
const { Header, Sider } = Layout;

const TagMenu = () => {

  const dispatch = useDispatch();
  const { isAuthenticated, tags} = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    tags: state.tags
  }));

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [tag, setTag] = useState('');

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });

  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(addTag({tag}))
    setConfirmLoading(false);
    setSuccess(true)
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleTag = (e) => {
    let t = e.target.value.replace(/ +/g, "");
    setTag(t);
  }

  const handleTagSelect = (e) => {
    const tag = e.key || e;
    dispatch(fetchTagPost(tag));
  }

  const renderAddTopicModal = () => (
    <Modal
      title={'Create New Tag'}
      visible={visibleModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={300}
    >
      <TextArea onChange={handleTag}  placeholder='Create Tag here...' rows={1} />
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
  )

  const renderAddTopic = () => (
    <div style={{ margin: isTabletOrMobileDevice ? "1px 5px 0px 0px" : 20}}>
      <Button onClick={() => setVisibleModal(true)}>Add Topic</Button>
    </div>
  );

  const renderTag = () => (
    <Fragment>
      {isAuthenticated && renderAddTopic()}
          <Menu.Item onClick={handleTagSelect} key='All' >
            <Link to='/home'>
              All
            </Link>
          </Menu.Item>
      {tags.map((tag, i)=> (
          <Menu.Item onClick={handleTagSelect} key={tag} >
            <Link to={`/home/${tag}`}>
              {tag}
            </Link>
          </Menu.Item>
      ))}
    </Fragment>
  )

  useEffect(() =>{
    dispatch(fetchTags());
  },[]);

  return (
    <div>
      {renderAddTopicModal()}
      {isTabletOrMobileDevice ? (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex' }}>
          {isAuthenticated && renderAddTopic()}
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
            <Select onChange={handleTagSelect} defaultValue="All" style={{ width: 120 }}>
                <Option  key={'All'} value="All">
                    All
                </Option>
              {tags.map((tag, i)=> (
                <Option key={tag} value={tag}>
                    {tag}
                </Option>
              ))}
            </Select>
          </Menu>
        </Header>
      ): (
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['All']}>
          {renderTag()}
        </Menu>
      </Sider>
      )}
    </div>
  );
}
 
export default TagMenu;