import { Fragment, useEffect, useState } from 'react';
import { Link, Route, Router, Switch, useLocation } from 'react-router-dom'
import { Layout, Spin } from 'antd';
import { useMediaQuery } from 'react-responsive'
import './landing.css'
import PostCard from './forum/PostCard';
import ProfileCard from './profile/ProfileCard';
import Post from './forum/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllForumPosts } from '../redux/actions/forum';
import TagMenu from './forum/TagMenu';

const { Content, Footer } = Layout;

interface ForumProps {
  forum: {
    posts: {
      id: string,
      comments: object,
      user: string,
      title: string,
      content: string,
      tags: Array<string>,
      name: string,
      username: string,
      avatar: string,
    }[]
  }
}


const Home: React.FC = () => {

  const dispatch = useDispatch();
  const forum = useSelector((state: ForumProps) => state.forum.posts);

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
      dispatch(fetchAllForumPosts());
    }
  }, [location.pathname]);

  return (
    <div >  
      <Layout>
        <TagMenu />
        <Layout className="site-layout" 
          style={{ marginLeft: isTabletOrMobileDevice? 0 : 200, marginTop: isTabletOrMobileDevice? 60 : 0, marginRight: isTabletOrMobileDevice? 0 : 400}}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 4 }}>
              {hideHomePost ? (
                <Fragment>
                  <Switch>
                  <Route path='/home/:username/:postHeading' component={Post} />
                    <Route path='/home/:tag'>
                      <Fragment>
                        {forum.map((post,id) => (
                          <PostCard key={id} {...post} /> 
                        ))}
                      </Fragment>
                    </Route>
                    <Route exact path='/home/my-posts'> 
                      <Fragment>
                        {forum.map((post,id) => (
                          <PostCard key={id} {...post} /> 
                        ))}
                      </Fragment>
                    </Route>
                  </Switch>
                </Fragment>
              ): (
                <Fragment>
                  {forum.map((post,id) => (
                     <PostCard key={id} {...post} /> 
                  ))}
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