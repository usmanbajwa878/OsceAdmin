import React, { useEffect, useState } from 'react';
import Table from "./tables";
import Typography from '@material-ui/core/Typography';

import { getComplaints } from '../../services/complaints';
import './style.css';
const Complaints = (props) => {
 const [complaints, setComplaints] = useState([])
 const [pageId, setPage] = useState(1)
 const [length, setLength] = useState(0)
 useEffect(() => {
  get();
 },[])

 const get = ()=> {
  getComplaints({pageId, token: localStorage.getItem("token")})
  .then((response) => {
   const {histories, count} = response.data.data;
   setLength(count);
   setComplaints(histories);
  })
 }
 return (
  <div className="complaintsContainer">
   <Typography variant="h3"> Complaints </Typography>
   <hr />
   <div className="tableWrapper">
    <Table complaints={complaints} length={length} setPage={setPage} page={pageId - 1} getComplaints={get} />
   </div>
  </div>
 )
}

export default Complaints;