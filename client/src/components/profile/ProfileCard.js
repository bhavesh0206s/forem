import { Card, Avatar, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProfileCard = ({setIsYourPostClicked}) => {

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });
  return (
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
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Link to='/home/my-posts'>
          <Button>Your Post</Button>
        </Link>,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
}
 
export default ProfileCard;