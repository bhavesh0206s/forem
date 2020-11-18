import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { useMediaQuery } from 'react-responsive';
import './forum.css';
const { Header, Sider } = Layout;

const TopicMenu = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });
  return (
    <div>
      {isTabletOrMobileDevice ? (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
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
 
export default TopicMenu;