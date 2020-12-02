import { Layout, Menu, Icon, Breadcrumb, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { addTag } from '../../redux/actions/forum';
import './forum.css';
const { Header, Sider } = Layout;

const TagMenu = () => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [tag, setTag] = useState('')

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });

  const handleOk = () => {
    setConfirmLoading(true);
    setVisibleModal(false);
    dispatch(addTag({tag}))
    setConfirmLoading(false);
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
  </Modal>
  )

  const renderAddTopic = () => (
    <div style={{margin: 20}}>
      <Button onClick={() => setVisibleModal(true)}>Add Topic</Button>
    </div>
  )

  return (
    <div>
      {renderAddTopicModal()}
      {isTabletOrMobileDevice ? (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {isAuthenticated && renderAddTopic()}
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          {isAuthenticated && renderAddTopic()}
          <Menu.Item key="1" >
            nav 1
          </Menu.Item>
          <Menu.Item key="2">
            nav 2
          </Menu.Item>
          <Menu.Item style={{paddingBottom: 150}} key="9">
            nav 9
          </Menu.Item>
        </Menu>
      </Sider>
      )}
    </div>
  );
}
 
export default TagMenu;