import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
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

import { deleteHistory } from "../../../services/history";


const columns = [
  { id: 'prompt', label: 'Prompt', minWidth: 20, maxWidth: 20 },
  { id: 'iconUrl', label: 'Icon' },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
    minWidth: 100
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
  }, [props]);

  const openEditor = (item) => {
    setEdit(true);
    setItem(item);
  }

  const handleDelete = (historyId) => {
    var confirmation = window.confirm("Are sure to delete")
    if(confirmation){
      return deleteHistory({historyId, token: localStorage.getItem("token")})
      .then((response) => {
        props.getHistories();
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
                  style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.complaints && props.complaints.map((history, ind) => {
              return (
                <TableRow key={ind}>
                  <TableCell key={`name_${ind + history.name}`} align={"left"}>
                    {history.prompt}
                  </TableCell>
                  <TableCell key={`icon_${ind + history.iconUrl}`} align={"left"}>
                    <img style={{ width: "20px", height: "20px" }} src={history.iconUrl} alt="iconUrl" />
                  </TableCell>
                  {/* Action cell */}
                  <TableCell key={`icon_${ind + history.id}`} align={"center"}>
                    <div>
                      <EditIcon className="pointer" onClick={() => { openEditor(history) }} />
                      <DeleteForeverIcon className="pointer" onClick={() => handleDelete(history._id)}  />
                      <div style={{ textAlign: "center" }}>
                        view Feedbacks
                        <VisibilityIcon className="pointer" onClick={() => push(`/feedback/${history._id}`)}  />
                      </div>
                      <div>
                        view Conditions
                        <VisibilityIcon  className="pointer" onClick={() => push(`/condition/${history._id}`)} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        // rowsPerPageOptions={[8, 25, 100]}
        component="div"
        count={props.length}
        rowsPerPage={8}
        page={props.page}
        onChangePage={handleChangePage}
      // onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}

      {edit &&
        <Editor  {...props}  {...item} close={() => setEdit(false)} />
      }
      {add &&
        <AddModal {...props} {...item} close={() => setAdd(false)} />
      }

    </Paper>
  );
}