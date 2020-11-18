import { useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import RightMenu from './RightMenu'
import { Drawer, Button, Input } from 'antd';
import './nav.css';
import mainLogo from '../../assets/logo_transparent.png'
import ProfileCard from '../profile/ProfileCard';
import { Link } from 'react-router-dom';
import AddPost from '../forum/AddPost';

const Navbar = () => {

  const [visible, setVisible] = useState(false); 
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });


  const showDrawer = () => {
    setVisible(true)
  };
  
  const onClose = () => {
    setVisible(false)
  };

  const onSearch = () => {

  }

  const showModal = () => {
    setVisibleModal(true);
  };

  return (
    <nav className="menuBar">
      <AddPost 
        confirmLoading={confirmLoading}
        visibleModal={visibleModal}  
        setConfirmLoading={setConfirmLoading}
        setVisibleModal={setVisibleModal}
      />
      <div className="logo">
        <Link to='/home'>
          forem
        </Link>
      </div>
      <div className="menuCon">
        <div className="leftMenu" style={{marginTop: 9}}>
          <Button type='primary' onClick={showModal}>Write a post</Button>
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu />
          <ProfileCard />
        </Drawer>
      </div>
    </nav>
  );
}
 
export default Navbar;
