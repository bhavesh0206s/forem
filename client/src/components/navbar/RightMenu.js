import { Menu, Grid, Button } from 'antd';
import { Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="mail">
        <Link to='/signin'>
          <Button>Login</Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="app">
      <Link to='/signup'>
        <Button type="primary">Create Account</Button>
      </Link>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;