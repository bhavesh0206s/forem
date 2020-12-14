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

  const handleTagSelect = (e) => {
    const tag = e.key;
    console.log(e)
    dispatch(fetchTagPost(tag));
  }

  const renderTag = () => (
    <Fragment>
      {isAuthenticated && renderAddTopic()}
        <Link to='/home'>
          <Menu.Item onClick={handleTagSelect} key='All' >
              All
          </Menu.Item>
        </Link>
      {tags.map((tag, i)=> (
        <Link to={`/home/${tag}`}>
          <Menu.Item onClick={handleTagSelect} key={tag} >
              {tag}
          </Menu.Item>
        </Link>
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
            <Select defaultValue="All" style={{ width: 120 }}>
                  <Link to='/home'> 
                <Option onClick={handleTagSelect} key={'All'} value="All">
                    All
                </Option>
                  </Link>
              {tags.map((tag, i)=> (
                <Option key={tag} onClick={handleTagSelect} value={tag}>
                  <Link to={`/home/${tag}`}>
                    {tag}
                  </Link>
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