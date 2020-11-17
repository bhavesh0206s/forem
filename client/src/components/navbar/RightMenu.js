import { Menu, Grid, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="mail">
        <Button>Login</Button>
      </Menu.Item>
      <Menu.Item key="app">
      <Button type="primary">Create Accound</Button>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;