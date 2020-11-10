import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const subjects = [
  'Math',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Computer'
]

const Topics = ({ topic }) => {
  return (
      <List>
        <Link to={`/forum`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <ListItem button key='All'>
              <ListItemIcon><MenuBookIcon /></ListItemIcon>
              <ListItemText primary='All' />
            </ListItem>
          </Link>
        {subjects.map((subject, index) => (
          <Link to={`/forum/${subject}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <ListItem button key={subject}>
              <ListItemIcon><MenuBookIcon /></ListItemIcon>
              <ListItemText primary={subject} />
            </ListItem>
          </Link>
        ))}
      </List> 
    // <div>
    //   <Link to={`/forums/${topic}`}>{topic}</Link>
    // </div>
  );
};

export default Topics;
