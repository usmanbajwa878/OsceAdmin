import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";

import Table from "./tables";
import Typography from '@material-ui/core/Typography';

import { getFeedbacks } from '../../services/feedbacks';
import './style.css';
const Complaints = (props) => {
 const {historyId} = useParams();
 const history = useHistory();

 const [complaints, setComplaints] = useState([])
 const [pageId, setPage] = useState(1)
 const [length, setLength] = useState(0)
 useEffect(() => {
  get();
 },[])

 const get = ()=> {
  getFeedbacks({historyId, token: localStorage.getItem("token")})
  .then((response) => {
   console.log("ER ", response)
   const {feedbacks, count} = response.data.data;
   // setLength(count);
   setComplaints(feedbacks);
  })
 }
 return (
  <div className="complaintsContainer">
  <span> <Link to="/">Complaints</Link> / <Link to="#" onClick={() => history.goBack()}>Histories</Link> / Feedbacks</span>
   <Typography variant="h4"> Feedbacks </Typography>
   <hr />
   <div className="tableWrapper">
    <Table complaints={complaints} getFeedbacks={get} length={length} page={pageId - 1} />
   </div>
  </div>
 )
}

export default Complaints;