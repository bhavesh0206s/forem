import { Spin, Space, Skeleton } from 'antd';

const Loading = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {/* <Space size="middle">
        <Spin size="large" />
      </Space> */}
      <Skeleton active avatar paragraph={{ rows: 4 }} />
    </div>
  );
}
 
export default Loading;