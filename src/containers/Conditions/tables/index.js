import React, { useEffect } from 'react';
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
import { deleteCondition } from '../../../services/conditions';

const columns = [
  { id: 'title', label: 'Title', minWidth: 50 },
  { id: 'subTitle', label: 'Sub Title' },
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

  const handleDelete = ({ _id }) => {
    
    deleteCondition({ conditionId: _id, token: localStorage.getItem("token") })
      .then((response) => {
        if (typeof response === 'string') return alert("Something went Wrong!")
        props.getCards()
      })
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
            {props.complaints && props.complaints.length > 0 && props.complaints.map((condition, ind) => {
              return (
                <TableRow key={ind}>
                  <TableCell key={`TITLE_${ind + condition.title}`} align={"left"}>
                    {condition.title}
                  </TableCell>
                  <TableCell key={`TILE_DATA_${ind + condition.subTitle}`} align={"left"}>
                    {condition.subTitle}
                  </TableCell>
                  {/* Action cell */}
                  <TableCell key={`icon_${ind + condition.id}`} align={"center"}>
                    <EditIcon className="pointer" onClick={() => { openEditor(condition) }} />
                    <DeleteForeverIcon className="pointer" onClick={() => { handleDelete(condition) }}  />
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
        <Editor {...props} {...item} close={() => setEdit(false)} />
      }
      {add &&
        <AddModal {...props} {...item} close={() => setAdd(false)} />
      }

    </Paper>
  );
}