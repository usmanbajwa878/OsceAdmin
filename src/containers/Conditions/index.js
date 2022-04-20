import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import Table from "./tables";
import Typography from '@material-ui/core/Typography';

import { getConditions } from '../../services/conditions';
import './style.css';
const Complaints = (props) => {
 const {historyId} = useParams();
 const history = useHistory();
 const [complaints, setConditions] = useState([])
 const [pageId, setPage] = useState(1)
 const [length, setLength] = useState(0)
 useEffect(() => {
  get();
 },[])

 const get = ()=> {
  getConditions({historyId, token: localStorage.getItem("token")})
  .then((response) => {
   const { count} = response.data.data;
   const conditions = [...response.data.data];
   // setLength(count);
   setConditions(conditions);
  })
 }
 return (
  <div className="complaintsContainer">
  <span> <Link to="/">Complaints</Link> / <Link onClick={() => history.goBack()}>Histories</Link> / Conditions</span>
   <Typography variant="h4"> Conditions </Typography>
   <hr />
   <div className="tableWrapper">
    <Table complaints={complaints} getConditions={get} length={length} page={pageId - 1} />
   </div>
  </div>
 )
}

export default Complaints;