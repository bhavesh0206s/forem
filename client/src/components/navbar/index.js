import { useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import RightMenu from './RightMenu'
import { Drawer, Button, Input } from 'antd';
import './nav.css';
import mainLogo from '../../assets/logo_transparent.png'
import ProfileCard from '../profile/ProfileCard';

const { Search } = Input;
const Navbar = () => {
  const [current, setCurrent] = useState('mail');
  const [visible, setVisible] = useState(false); 

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

  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="">forem</a>
        <div className='searcbBar'>
          {isTabletOrMobileDevice && (
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              style={{width: 100}}
            />
          )}
        </div>
      </div>
      <div className="menuCon">
        {/* <div className="leftMenu">
          <LeftMenu />
        </div> */}
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
