import { Form, Input, InputNumber, Button, Card } from 'antd';
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUsernameAndBio } from '../../redux/actions/auth';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

interface Values {
  user: {
    bio: string,
    username: string,
  }
}

const UserForm = () => {

  const dispatch = useDispatch();

  const onFinish = (values: Values) => {
    const {username, bio} = values.user;
    dispatch(saveUsernameAndBio(username, bio));
  };

  return (
    <div className='signup'>
      <Card
        className='signup-card'
        hoverable
      >
        <Form style={{display: 'flex', justifyContent: 'center', alignItems:'center',flexDirection: 'column'}} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['user', 'username']} label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'bio']} label="About me" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Link to='/home'>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;