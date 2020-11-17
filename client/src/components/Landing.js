import { useState } from 'react';
import { Layout } from 'antd';
import { useMediaQuery } from 'react-responsive'
import './landing.css'
import TopicMenu from './forum/TopicMenu';
import PostCard from './forum/PostCard';
import ProfileCard from './profile/ProfileCard';

const { Content, Footer } = Layout;

const Landing = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });
  return (
    <div >  
      <Layout>
        <TopicMenu />
        <Layout className="site-layout" 
          style={{ marginLeft: isTabletOrMobileDevice? 0 : 200, marginTop: isTabletOrMobileDevice? 60 : 0, marginRight: isTabletOrMobileDevice? 0 : 400}}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        {!isTabletOrMobileDevice && <ProfileCard />}
      </Layout>
      <Footer>Footer</Footer>
    </div>
  );
}
 
export default Landing;