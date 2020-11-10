import React, { Fragment, useState, useEffect } from 'react'
import { Link, Route, Router, Switch, useLocation } from 'react-router-dom'
import Topics from './topics'
import ForumPost from './forumPost'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TopicDetails from './topicDetails'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Button } from '@material-ui/core'
import AddTopic from './addTopic'
import SelectedTopicDetails from './selectedTopicDetails'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllForumPost } from '../../redux/actions/forum'

const defaultProps = {
  bgcolor: 'background.paper',
  width: '100%',
  m: 1,
  style: { width: '5rem', height: '5rem' },
  borderColor: 'text.primary'
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: 'linear-gradient(to right, #001510, #00bf8f)',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  backBtn: {
    marginLeft: 20,
    marginTop: 20
  },
}))

const recentQandA = [
  {
    id: 'abc123',
    topic: 'maths',
    name: 'Bhavesh Suthar',
    que: 'why maths seems so hard?',
    repliescount: 3,
    upvotes: 10
  },
  {
    id: 'abc124',
    topic: 'physics',
    name: 'Bhavesh Suthar',
    que: 'why physics seems so hard?',
    repliescount: 3,
    upvotes: 10
  },
  {
    id: 'abc125',
    topic: 'history',
    name: 'Bhavesh Suthar',
    que: 'why history seems so hard?',
    repliescount: 3,
    upvotes: 10
  }
]

const Forum = ({ match }) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const [hideMain, setHideMain] = useState(false);
  const [openAddTopic, setOpenAddTopic] = useState(false);
  const forumPost = useSelector(state => state.forum);

  const handleAddDrawer = () => {
    setOpenAddTopic(!openAddTopic)
  }

  useEffect(() => {
    dispatch(fetchAllForumPost())
  },[])

  useEffect(() => {
    if (location.pathname !== '/forum') {
      setHideMain(true)
    } else {
      setHideMain(false)
    }
  }, [location.pathname])

  return (
    <div className={classes.root} style={{ marginTop: 20 }}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Link to='/dashboard' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button color='inherit'>
              Dashboard
            </Button>
          </Link>
          <Link to='/forum' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button color='inherit'>
              Forum
            </Button>
          </Link>
          <Link to='/announcement' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button color='inherit'>
              Announcment
            </Button>
          </Link>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Button color='secondary'>
              Logout
            </Button>
          </Link>
          <div style={{ paddingLeft: 30 }}>
            <Button
              variant='contained'
              color='default'
              className={classes.button}
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddDrawer}
            >
              New Topic
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      {openAddTopic && (
        <AddTopic
          openAddTopic={openAddTopic}
          handleAddDrawer={handleAddDrawer}
        />
      )}
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='left'
      >
        <Link to='/dashboard' style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <IconButton className={classes.backBtn} color='primary'>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <div className={classes.toolbar} />
        <Divider />
        <Topics />
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className='container'>
          {!hideMain && forumPost.map(item => <ForumPost item={item} />)}
          <Switch>
            <Route exact path='/forum/:topics' component={TopicDetails} />
            <Route path='/forum/:topics/:id' component={SelectedTopicDetails} />
          </Switch>
        </div>
      </main>
    </div>
    // <div>
    //   <Link to={`/forums/${topic}`}>{topic}</Link>
    // </div>
  )
  //     <h1 style={{textAlign: 'center'}}>Forum</h1>
  //     <Box borderBottom={1} {...defaultProps} />
  //     <div style={{ display: "flex" }}>
  //       <div className="" style={{ flexDirection: "column" }}>
  //         <Topics />
  //       </div>
  //       <div className="" style={{ display: 'flex', flexDirection: 'column', width: 800, margin: '0 auto' }}>
  //         <div>
  //           <h1 style={{textAlign: 'center'}}>Recently Asked Q&A</h1>
  //         </div>

  //       </div>
  //     </div>
  // );
}
export default Forum
