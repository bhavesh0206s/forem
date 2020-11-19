import { Fragment, useEffect, useState } from 'react';
import { Link, Route, Router, Switch, useLocation } from 'react-router-dom'
import { Layout } from 'antd';
import { useMediaQuery } from 'react-responsive'
import './landing.css'
import TopicMenu from './forum/TopicMenu';
import PostCard from './forum/PostCard';
import ProfileCard from './profile/ProfileCard';
import Post from './forum/Post';

const { Content, Footer } = Layout;

const Home = () => {
  const location = useLocation();
  const [hideHomePost, setHideHomePost] = useState(false);

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });

  useEffect(() => {
    if (location.pathname !== '/home') {
      setHideHomePost(true)
    } else {
      setHideHomePost(false)
    }
  }, [location.pathname])

  return (
    <div >  
      <Layout>
        <TopicMenu />
        <Layout className="site-layout" 
          style={{ marginLeft: isTabletOrMobileDevice? 0 : 200, marginTop: isTabletOrMobileDevice? 60 : 0, marginRight: isTabletOrMobileDevice? 0 : 400}}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              {hideHomePost ? (
                <Fragment>
                  <Switch>
                    <Route exact path='/home/my-posts' component={PostCard} />
                    <Route path='/home/:username/:postHeading' component={Post} />
                  </Switch>
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
          <Footer style={{ textAlign: 'center' }}>Forem ©2020 Created by Bhavesh Suthar</Footer>
        </Layout>
        {!isTabletOrMobileDevice && <ProfileCard />}
      </Layout>
      <Footer>Footer</Footer>
    </div>
  );
}
 
export default Home;