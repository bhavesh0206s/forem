import { Card, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { fetchMyForumPost } from '../../redux/actions/forum';

const { Meta } = Card;

const ProfileCard = ({setIsYourPostClicked}) => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });
  
  return (
    <Fragment>
      {user ? (
        <Card
          style={ !isTabletOrMobileDevice ?  {
              width: 300,
              position: 'fixed',
              right: 100,
              top: 80
            }: {
              width: 235,
              margin: 10,
              position: 'relative',
            }}
          cover={
            <img
              alt="example"
              src="https://source.unsplash.com/random/600x400"
            />
          }
          actions={[
            <Link to='/home/my-posts'>
              <Button onClick={() => dispatch(fetchMyForumPost(user._id))}>
                Your Post
              </Button>
            </Link>,
          ]}
        >
          <Meta
            avatar={<Avatar src={user.picture} />}
            title={user.name}
            description={user.bio}
          />
        </Card>
      ): null}
    </Fragment>
  );
}
 
export default ProfileCard;