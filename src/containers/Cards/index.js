import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import Table from "./tables";
import Typography from '@material-ui/core/Typography';

import { getCards } from '../../services/moreInfo';
import './style.css';
const Complaints = (props) => {
  const history = useHistory();
  const { feedbackId } = useParams();
  const [complaints, setComplaints] = useState([])
  const [pageId, setPage] = useState(1)
  const [length, setLength] = useState(0)
  useEffect(() => {
    get();
  }, [])

  const get = () => {
    getCards({ feedbackId, token: localStorage.getItem("token") })
      .then((response) => {
        const { histories, count } = response.data.data;
        setLength(count);
        setComplaints(response.data.data);
      })
  }
  return (
    <div className="complaintsContainer">
      <span> <Link to="/">Complaints</Link> / Histories / <Link to="#" onClick={() => history.goBack()}>Feedbacks</Link> / MoreInfo</span>
      <Typography variant="h4"> Cards/MoreInformation </Typography>
      <hr />
      <div className="tableWrapper">
        <Table complaints={complaints} getCards={get} length={length} page={pageId - 1} />
      </div>
    </div>
  )
}

export default Complaints;