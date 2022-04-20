import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
 const [open, setOpen] = useState(true);
 const [name, setName] = useState("")
 const [icon, setIcon] = useState("")

 useEffect(() => {
  setName(props.name);
  setIcon(props.iconUrl);
 }, [])

 const handleClose = () => {
  setOpen(false);
  props.close();
 };

 const onFileSelect = (e) => {
  const { files } = e.target;
  setIcon(URL.createObjectURL(files[0]))
 }

 return (
  <div>
   <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Edit Complaints</DialogTitle>
    <DialogContent>
     <TextField fullWidth autoFocus margin="dense" name="name" label="Complaint Name" type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
     />
     <div style={{ width: "80px", height: "80px", margin: "10px" }} >
      <img style={{ width: "50px", height: "50px" }} src={icon} alt={"icon"} />
     </div>
     <Button variant="contained" component="label">
      Upload Icon
      <input type="file" accept="image/*" hidden onChange={onFileSelect} />
     </Button>
    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose} color="primary">Cancel</Button>
     <Button onClick={handleClose} color="primary">Update</Button>
    </DialogActions>
   </Dialog>
  </div>
 );
}