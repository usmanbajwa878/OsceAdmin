import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UploadToAWS } from '../../constants/aws';

import { updateHistory } from "../../services/history";
export default function FormDialog(props) {
 var { complaintId } = useParams();
 const [open, setOpen] = useState(true);
 const [age, setAge] = useState(17)
 const [colour, setColour] = useState("")
 const [grade, setGrade] = useState("")
 const [gender, setGender] = useState("male")
 const [thumbnail, setThumbnail] = useState("")
 const [thumbFile, setThumbFile] = useState()
 const [dialogflowCredentials, setDialogflowCredentials] = useState({})
 // const [name, setName] = useState("")
 const [prompt, setPrompt] = useState("")
 const [icon, setIcon] = useState("")
 const [file, setFile] = useState()

 useEffect(() => {
  const { iconUrl, prompt, dialogflowCredentials, thumbnailUrl, grade, gender, age, colour, complaintId } = props;
  setDialogflowCredentials(dialogflowCredentials[0]);
  setPrompt(prompt);
  setAge(age);
  setColour(colour);
  setIcon(iconUrl);
  setThumbnail(thumbnailUrl)
  setGrade(grade)
  setGender(gender)
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
 const onThumbSelect = (e) => {
  const { files } = e.target;
  setThumbnail(URL.createObjectURL(files[0]))
  setThumbFile(files[0])
 }

 const uploadFile = async (file, name) => {
  var isSuccessfull = false;
  var promise = UploadToAWS({ Bucket: "osceai/history", Key: `${name}.png`, Body: file }).promise();
  promise.then((data) => {
   setIcon(data.Location);
   return;
  })
  promise.catch((err) => {
   console.log("ERR UPLOAD", err.message);
   alert("something went wrong!")
  })
  return promise.finally(() => { return isSuccessfull; })
 }

 const handleDialogFlowCred = ({ target }) => {
  var newObj = dialogflowCredentials;
  newObj[target.name] = target.value;
  setDialogflowCredentials(newObj)
 }

 const handleSubmit = () => {
  if (!icon) return alert("Chose a file first");
  if (!thumbnail) return alert("Chose a thumbnail first");
  const token = localStorage.getItem("token");
  const historyId = props._id;
  var body = {
   prompt,
   age,
   gender,
   colour,
   grade,
   thumbnailUrl: props.thumbnailUrl,
   iconUrl: props.iconUrl,
   dialogflowCredentials,
   source: "web",
   complaintId
  }
  if (props.iconUrl === icon && thumbnail === props.thumbnailUrl) {
   return update({ data: body, token, historyId })
  }
  if (props.iconUrl != icon && thumbnail === props.thumbnailUrl) {
   if (!file) return alert("Select a file first")
   uploadFile(file, "iconUrl" + new Date())
    .then((iconFile) => {
     if (!iconFile.Location) return alert("Something went wrong!");
     body.iconUrl = iconFile.Location;
     return update({ data: body, token, historyId })
    })
  }

  if (props.thumbnailUrl != thumbnail && props.iconUrl === icon) {
   if (!thumbnail) return alert("Select a thumbnail first")
   uploadFile(thumbFile, "iconUrl" + new Date())
    .then((thumbUrl) => {
     if (!thumbUrl.Location) return alert("Something went wrong!");
     body.thumbnailUrl = thumbUrl.Location;
     return update({ data: body, token, historyId })
    })
  }

  if (props.thumbnailUrl != thumbnail && props.iconUrl != icon) {
   if (!file) return alert("Select a file first");
   if (!thumbnail) return alert("Select a thumbnail first");
   uploadFile(file, "iconUrl" + new Date())
    .then((iconFile) => {
     if (!iconFile.Location) return alert("Something went wrong!");

     uploadFile(thumbFile, "iconUrl" + new Date())
      .then((thumbUrl) => {
       if (!thumbUrl.Location) return alert("Something went wrong!");
       body.thumbnailUrl = thumbUrl.Location;
       body.iconUrl = iconFile.Location;
       return update({ data: body, token, historyId })
      })

    })
  }

 }

 const update = (payload) => {
  updateHistory(payload)
   .then((response) => {
    props.getHistories();
    handleClose();
   })
 }

 return (
  <div>
   <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Edit History</DialogTitle>
    <DialogContent>
     <TextField fullWidth autoFocus margin="dense" name="prompt" label="Prompt" type="text"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
     />
     <TextField fullWidth margin="dense" name="age" label="Age" type="number"
      value={age}
      onChange={(e) => setAge(e.target.value)}
     />
     <TextField fullWidth margin="dense" name="colour" label="Colour" type="text"
      value={colour}
      onChange={(e) => setColour(e.target.value)}
     />
     <TextField fullWidth margin="dense" name="grade" label="Grade" type="text"
      value={grade}
      onChange={(e) => setGrade(e.target.value)}
     />
     <TextField fullWidth margin="dense" name="gender" label="Gender" type="text"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
     />
     <div style={{ margin: "15px" }}>
      <label> <b>Dialog Flow Credentials:</b></label>
      <TextField fullWidth margin="dense" name="auth_provider_x509_cert_url" label="auth_provider_x509_cert_url" type="text"
       value={dialogflowCredentials.auth_provider_x509_cert_url}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="auth_uri" label="auth_uri" type="text"
       value={dialogflowCredentials.auth_uri}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="client_email" label="client_email" type="text"
       value={dialogflowCredentials.client_email}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="client_id" label="client_id" type="text"
       value={dialogflowCredentials.client_id}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="client_x509_cert_url" label="client_x509_cert_url" type="text"
       value={dialogflowCredentials.client_x509_cert_url}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="private_key" label="private_key" type="text"
       value={dialogflowCredentials.private_key}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="private_key_id" label="private_key_id" type="text"
       value={dialogflowCredentials.private_key_id}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="project_id" label="project_id" type="text"
       value={dialogflowCredentials.project_id}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="token_uri" label="token_uri" type="text"
       value={dialogflowCredentials.token_uri}
       onChange={handleDialogFlowCred}
      />
      <TextField fullWidth margin="dense" name="type" label="type" type="text"
       value={dialogflowCredentials.type}
       onChange={handleDialogFlowCred}
      />
     </div>
     <div style={{ margin: "15px" }}>
      {icon &&
       <div style={{ width: "80px", height: "80px", margin: "10px" }} >
        <img style={{ width: "50px", height: "50px" }} src={icon} alt={"icon"} />
       </div>
      }
      <Button variant="contained" component="label">
       Upload Icon
      <input type="file" accept="image/*" hidden onChange={onFileSelect} />
      </Button>
     </div>
     <div style={{ margin: "15px" }}>
      {thumbnail &&
       <div style={{ width: "80px", height: "80px", margin: "10px" }} >
        <img style={{ width: "50px", height: "50px" }} src={thumbnail} alt={"icon"} />
       </div>
      }
      <Button variant="contained" component="label">
       Upload Thumbnail
      <input type="file" accept="image/*" hidden onChange={onThumbSelect} />
      </Button>
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