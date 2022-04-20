import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import VisibilityIcon from '@material-ui/icons/Visibility';

import Editor from '../edit';
import AddModal from '../add';

import { deleteCard } from "../../../services/moreInfo";

const columns = [
  { id: 'title', label: 'Title', minWidth: 50 },
  { id: 'iconUlr', label: 'Icon' },
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
    deleteCard({ cardId: _id, token: localStorage.getItem("token") })
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
            {props.complaints && props.complaints.map((info, ind) => {
              return (
                <TableRow key={ind}>
                  <TableCell key={`title_${ind + info.title}`} align={"left"}>
                    {info.title}
                  </TableCell>
                  <TableCell key={`icon_${ind + info.iconUrl}`} align={"left"}>
                    <img style={{ width: "20px", height: "20px" }} src={info.iconUrl} alt="iconUrl" />
                  </TableCell>
                  {/* Action cell */}
                  <TableCell key={`actions_${ind + info.id}`} align={"center"}>
                    <EditIcon className="pointer" onClick={() => { openEditor(info) }} />
                    <DeleteForeverIcon className="pointer" onClick={() => { handleDelete(info) }} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {edit &&
        <Editor {...props} {...item} close={() => setEdit(false)} />
      }
      {add &&
        <AddModal {...props} {...item} close={() => setAdd(false)} />
      }

    </Paper>
  );
}