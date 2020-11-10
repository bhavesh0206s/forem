import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Button, Menu,  MenuItem, TextField } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AssignmentTurnedInSharpIcon from '@material-ui/icons/AssignmentTurnedInSharp';
import { useDispatch } from 'react-redux';
import { addForumPost } from '../../redux/actions/forum';

const useStyles = makeStyles((theme) =>( {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100ch',
  },
}));

const subjects = [
  'Math',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Computer'
]

const AddTopic = ({openAddTopic, handleAddDrawer}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedTopic, setSelectedTopic] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    detail: '',
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setSelectedTopic(e.target.textContent)
    setAnchorEl(null);
  };

  const onChangeHandler = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addForumPost(formData, selectedTopic))
  }

  const renderMenu = () => (
    <div style={{paddingTop: 10, paddingBottom: 10}}>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {selectedTopic.length === 0 ? 'Select Subject' : selectedTopic }
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {subjects.map(subject => (
          <MenuItem onClick={handleClose}>{subject}</MenuItem>
        ))}
      </Menu>
    </div>
  )

  return (
    <Fragment>
      <Drawer open={openAddTopic} onClose={handleAddDrawer}  anchor='bottom'>
        <div style={{margin: 15}}>
          <h2>Create a new Topic</h2>
        </div>
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="on">
          <div>
            <TextField 
              className={classes.textField} 
              fullWidth 
              name="title"
              id="outlined-basic" 
              label="Type title" 
              variant="outlined" 
              required
              value={formData.title}
              onChange={(e) => onChangeHandler(e)}
            />
            {renderMenu()}
            <TextField
              id="outlined-multiline-static"
              label="Type Details here...."
              multiline
              name="detail"
              rows={4}
              className={classes.textField}
              variant="outlined"
              required
              value={formData.detail}
              onChange={(e) => onChangeHandler(e)}
            />
          </div>
          <div style={{margin: 20}}>
            <Button type="submit" variant="contained" color="primary">
              <AssignmentTurnedInSharpIcon />
              Submit
            </Button>
          </div>
        </form>
      </Drawer>
    </Fragment>
  );
}
 
export default AddTopic;