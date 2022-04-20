import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Editor from '../edit';
import AddModal from '../add';

import { deleteFeedback } from "../../../services/feedbacks"
const columns = [
  { id: 'title', label: 'Title', minWidth: 50 },
  { id: 'heading', label: 'Heading' },
  { id: 'subheading', label: 'Sub Heading' },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TableGenerator(props) {
  const classes = useStyles();
  const { push } = useHistory();
  const [page, setPage] = React.useState(1);
  const [edit, setEdit] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [item, setItem] = React.useState({});

  useEffect(() => {
  }, [props]);

  const openEditor = (item) => {
    setEdit(true);
    setItem(item);
  }


  const handleDelete = (feedbackId) => {
    var confirmation = window.confirm("Are sure to delete")
    if (confirmation) {
      return deleteFeedback({ feedbackId, token: localStorage.getItem("token") })
        .then((response) => {
          props.getFeedbacks();
        })
    }
    return alert("Not delted")
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Button onClick={() => setAdd(true)} style={{ background: "lightGrey" }} >Add New</Button>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.complaints && props.complaints.map((feedback, ind) => {
              return (
                <TableRow key={ind}>
                  <TableCell key={`name_${ind + feedback.title}`} align={"left"}>
                    {feedback.title}
                  </TableCell>
                  <TableCell key={`name_${ind + feedback.heading}`} align={"left"}>
                    {feedback.heading}
                  </TableCell>
                  <TableCell key={`name_${ind + feedback.subHeading}`} align={"left"}>
                    {feedback.subHeading}
                  </TableCell>
                  {/* Action cell */}
                  <TableCell key={`icon_${ind + feedback.id}`} align={"center"}>
                    <EditIcon className="pointer" onClick={() => { openEditor(feedback) }} />
                    <DeleteForeverIcon className="pointer" onClick={() => handleDelete(feedback._id)} />
                    <VisibilityIcon className="pointer" onClick={() => push(`/card/${feedback._id}`)} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {edit &&
        <Editor {...props} {...item} keys={item.key} close={() => setEdit(false)} />
      }
      {add &&
        <AddModal {...props} {...item} close={() => setAdd(false)} />
      }

    </Paper>
  );
}