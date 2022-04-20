import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UploadToAWS } from '../../constants/aws';
import { addComplaint } from "../../services/complaints";
export default function FormDialog(props) {
 const [open, setOpen] = useState(true);
 const [name, setName] = useState("")
 const [icon, setIcon] = useState("")
 const [file, setFile] = useState(undefined)

 useEffect(() => {
 }, [])

 const handleClose = () => {
  setOpen(false);
  props.close();
 };

 const onFileSelect = (e) => {
  const { files } = e.target;
  setIcon(URL.createObjectURL(files[0]))
  setFile(files[0])
 }

 const uploadFile = async (file, name) => {
  var promise = UploadToAWS({ Bucket: "osceai/complaints", Key: `${name}.png`, Body: file }).promise();
  var isSuccessfull = false;
  promise.then((data) => {
   setIcon(data.Location);
   isSuccessfull = true;
  })
  promise.catch((err) => {
   console.log("ERR UPLOAD", err.message);
   alert("something went wrong!");
   isSuccessfull = false;
  })
  return promise.finally(() => { return isSuccessfull; })
 }

 const hanldeAdd = async () => {
  if (!icon || !file) return alert("Chose a file first");
  if (!name) return alert("Please specify a name");
  // const isUpdated = await 
  uploadFile(file, name)
  // console.log("FILE UPLOADED ", isUpdated)
  
  .then(async (uploadFile) => {
   console.log("FILE UPLOADED ", uploadFile)
   if (!uploadFile || !uploadFile.Key || !uploadFile.Location) return alert("somethinge went wrong");
   const data = { name: name, iconUrl: icon, source: "web" }
   await new Promise((resove) => {
    addComplaint({ token: localStorage.getItem("token"), data })
    .then((response) => {
     console.log(response)
     props.getComplaints();
     handleClose();
    })
    .catch((err) => {
     console.log("err post complaints ", err)
     alert("something went wrong!")
    })

   })
  })
 }

 return (
  <div>
   <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Add Complaint</DialogTitle>
    <DialogContent>
     <TextField fullWidth autoFocus margin="dense" name="name" label="Complaint Name" type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
     />
     {icon &&
      <div style={{ width: "80px", height: "80px", margin: "10px" }} >
       <img style={{ width: "50px", height: "50px" }} src={icon} alt={"icon"} />
      </div>
     }
     <Button variant="contained" component="label">
      Upload Icon
      <input type="file" accept="image/*" hidden onChange={onFileSelect} />
     </Button>
    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose} color="primary">Cancel</Button>
     <Button onClick={hanldeAdd} color="primary">Add</Button>
    </DialogActions>
   </Dialog>
  </div>
 );
}