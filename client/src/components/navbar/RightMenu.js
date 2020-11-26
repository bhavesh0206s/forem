import { Menu, Grid, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/auth';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const user = auth.user;

  return (
    <Menu mode={md ? "horizontal" : "inline"}>
      <Menu.Item key="mail">
        {isAuthenticated ? (
          <Button>{user.name}</Button>
        ) : (
          <Link to='/signin'>
            <Button>Login</Button>
          </Link>
        )}
      </Menu.Item>
      <Menu.Item key="app">
        {isAuthenticated ? (
          <a href='/api/logout'>
            <Button type="primary">Logout</Button>
          </a>
        ) : (
          <Link to='/signup'>
              <Button type="primary">Create Account</Button>
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;