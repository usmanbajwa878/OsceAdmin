import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import Table from "./tables";
import Typography from '@material-ui/core/Typography';

import { getHistories } from '../../services/history';
import './style.css';
const Complaints = (props) => {
 const [complaints, setComplaints] = useState([])
 const [pageId, setPage] = useState(1)
 const [length, setLength] = useState(0);
 const {complaintId} = useParams();
 useEffect(() => {
  get();
 },[])

 const get = ()=> {
  getHistories({pageId, token: localStorage.getItem("token"), complaintId})
  .then((response) => {
   const {histories, count} = response.data.data;
   setLength(count);
   setComplaints(histories);
  })
 }
 return (
  <div className="complaintsContainer">
  <span> <Link to="/">Complaints</Link> / Histories</span>
   <Typography variant="h4" > Histories</Typography>
   <hr />
   <div className="tableWrapper">
    <Table complaints={complaints} length={length} getHistories={get} page={pageId - 1} />
   </div>
  </div>
 )
}

export default Complaints;