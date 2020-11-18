import { Fragment, useState } from 'react';
import { Layout } from 'antd';
import { useMediaQuery } from 'react-responsive'
import './landing.css'
import TopicMenu from './forum/TopicMenu';
import PostCard from './forum/PostCard';
import ProfileCard from './profile/ProfileCard';

const { Content, Footer } = Layout;

const Landing = () => {

  const [isYourPostClicked, setIsYourPostClicked] = useState(false);

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
              {isYourPostClicked ? (
                <Fragment>
                  <h2>Your Posts</h2>
                  <PostCard />
                  <PostCard />
                </Fragment>
              ): (
                <Fragment>
                  <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard />
                </Fragment>
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        {!isTabletOrMobileDevice && <ProfileCard setIsYourPostClicked={setIsYourPostClicked}/>}
      </Layout>
      <Footer>Footer</Footer>
    </div>
  );
}
 
export default Landing;