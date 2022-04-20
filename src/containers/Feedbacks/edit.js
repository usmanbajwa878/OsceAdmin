import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import SearchField from "../../components/fields/search";

import { updateFeedback } from "../../services/feedbacks";
export default function FormDialog(props) {
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("")
  const [heading, setHeading] = useState("")
  const [subHeading, setSubHeading] = useState("")
  const [key, setKey] = useState(0)
  const [position, setPosition] = useState("")
  const [identifier, setIdentifier] = useState("")
  const [clickable, setClickable] = useState(true)
  const [accepted, setAccepted] = useState(true)
  const [operands, setOperands] = useState([])
  const [values, setValue] = useState([])

  useEffect(() => {
    console.log("PROPS  ", props)
    setTitle(props.title);
    setHeading(props.heading);
    setSubHeading(props.subHeading);
    setKey(props.keys);
    setPosition(props.position);
    setIdentifier(props.identifier);
    setClickable(props.clickable);
    setAccepted(props.accepted);
    setOperands(props.operands);
    setValue(props.values);
  }, [])

  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  const handleOperands = ({ target }) => {
    if (!target.value) return;
    let newArray = [...operands];
    newArray = [...newArray, target.value.toUpperCase()]
    setOperands([...newArray])
  }

  const removeOperand = (i) => {
    let newArray = [...operands]
    newArray = newArray.filter((v, ind) => ind != i);
    setOperands([...newArray])
  }
  const handleValues = ({ target }) => {
    if (!target.value) return;
    let newArray = [...values];
    newArray = [...newArray, target.value.toUpperCase()]
    setValue([...newArray])
  }

  const removeValue = (i) => {
    let newArray = [...values]
    newArray = newArray.filter((v, ind) => ind != i);
    setValue([...newArray])
  }

  const handleSubmit = () => {
    if (!title || !heading || !subHeading || !identifier) return alert("Check fields")
    const body = {
      title,
      heading,
      subHeading,
      identifier,
      position,
      clickable: clickable,
      accepted: accepted,
      operands,
      values,
      key: Number(key),
    }

    updateFeedback({ feedbackId: props._id, data: body, token: localStorage.getItem("token") })
      .then((response) => {
        props.getFeedbacks();
        props.close();
      })
      .catch((err) => {
        console.log(err.message)
        alert("something went wrong!")
      })
  }

  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Feedback</DialogTitle>
        <DialogContent>

          <TextField fullWidth autoFocus margin="dense" name="title" label="Title" type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField fullWidth margin="dense" name="heading" label="Heading" type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <TextField fullWidth margin="dense" name="subHeading" label="Sub Heading" type="text"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
          />
          <TextField fullWidth margin="dense" name="key" label="Key" type="number"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <TextField fullWidth margin="dense" name="position" label="Position" type="number"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <TextField fullWidth margin="dense" name="identifier" label="Identifier" type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <br />
          <br />
          <FormControlLabel
            value="clickable"
            control={<Checkbox
            checked={clickable}
            onChange={(e) => setClickable(e.target.checked)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />}
            label="Clickable"
            labelPlacement="start"
          />
          <FormControlLabel
            value="accepted"
            control={<Checkbox
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />}
            label="Accepted"
            labelPlacement="start"
          />
          <div style={{ margin: "15px", maxWidth: "100%" }}>
            <label> operands : </label>
            {operands.map((value, ind) => <Selected ind={ind} value={value} onClick={removeOperand} />)}
          </div>

          <div>
            <SearchField
              onChange={handleOperands}
              lebal={"operands"}
              placeholder={"Operands"}
            />
          </div>

          <div style={{ margin: "15px", maxWidth: "100%" }}>
            <label> values : </label>
            {values.map((value, ind) => <Selected ind={ind} value={value} onClick={removeValue} />)}
          </div>

          <div>
            <SearchField
              onChange={handleValues}
              lebal={"values"}
              placeholder={"Values"}
            />
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Selected = ({ ind, onClick, value }) => {
  return (
    <div key={ind} role="button" className="MuiAutocomplete-root  MuiChip-root MuiAutocomplete-tag MuiChip-outlined MuiChip-deletable" >
      <span className="MuiChip-label">{value}</span>
      <svg onClick={() => onClick(ind)} className="MuiSvgIcon-root MuiChip-deleteIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
      </svg>
    </div>
  )
}