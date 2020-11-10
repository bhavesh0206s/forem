import { Avatar, Badge, Button, Divider } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reply from "./reply";

const replies = [
  {
    id: "cab126",
    topic: "history",
    que: "why history seems so hard?",
    upvotes: 15,
    ans: "are hum haina sikha denge",
  },
  {
    id: "cab127",
    topic: "history",
    que: "why history seems so hard?",
    upvotes: 15,
    ans: "its easy just love history and the rest is history",
  },
];

const SelectedTopicDetails = () => {

  const {topics, id} = useParams()

  const [showReplyModal, setShowReplyModal] = useState(false);

  const handleReplyClick = () => {
    setShowReplyModal(!showReplyModal);
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className='card_head' style={{marginBottom: 20}}>
          <span className="tag tag-teal">{topics}</span>
          <small style={{textAlign: 'end'}}>13-11-2020</small>
          </div>
          <div style={{display:'flex'}}>
            <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <h4 style={{paddingLeft: 10, color:'grey'}}>John Due</h4>
          </div>
          <div style={{marginTop: 10}}>
            <h4 style={{fontSize: 20}}>Why is the Tesla Cybertruck designed the way it is?</h4>
            <p style={{fontSize: 20}}>Numquam nemo magni temporibus quo reiciendis minima nostrum voluptas deserunt obcaecati exercitationem?</p>
          </div>
        <Divider />
        <div className='card_head' style={{marginTop: 20,marginBottom: 20}}>
          <span className="tag tag-teal" style={{backgroundColor: 'grey'}}>replied by</span>
          <small style={{textAlign: 'end'}}>13-11-2020</small>
          </div>
          <div style={{display:'flex'}}>
            <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <h4 style={{paddingLeft: 10, color:'grey'}}>Bhavesh Suthar</h4>
          </div>
          <div style={{marginTop: 10}}>
            <p style={{fontSize: 20}}>Elon musk life, his rules, his company,vusko jo karna hai kare. Tereko kya hai</p>
          </div>
          <div>
        </div>
      </div>
      <Button variant="contained" color="primary" onClick={handleReplyClick}>
        Reply
      </Button>
      {showReplyModal && (
        <Reply showReplyModal={showReplyModal} handleReplyClick={handleReplyClick}/>
      )}
    </div>
  );
};

export default SelectedTopicDetails;
// Isme file mai hum comment wala integrate kar sakte
