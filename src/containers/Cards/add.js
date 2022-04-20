import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UploadToAWS } from '../../constants/aws';

import { addCard } from "../../services/moreInfo";
const tileDump = {
  text: "",
  title: "",
  position: 0,
  iconUlr: "https://osceai.s3.ap-south-1.amazonaws.com/complaints/love%403x.png",
}
export default function FormDialog(props) {
 const {feedbackId}  = useParams();
 const [open, setOpen] = useState(true);
 const [iconUploaded, setIconUploaded] = useState(false);
 const [title, setTitle] = useState("")
 const [icon, setIcon] = useState("")
 const [file, setFile] = useState({})
 const [tileData, setTileData] = useState([tileDump])


 useEffect(() => {
  // uploadFile()
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
  var date = new Date();
  var promise = UploadToAWS({ Bucket: "osceai/cards", Key: `${name+ date.toUTCString()+"_"+date.toLocaleTimeString() }.png`, Body: file }).promise();
  promise.then((data) => {
   setIcon(data.Location);
   setIconUploaded(true)
   return;
  })
  promise.catch((err) => {
   console.log("ERR UPLOAD", err.message);
   alert("something went wrong!")
  })
 }

 const handleOnChange = (index, { value, name }) => {
  let newArray = [...tileData];
  let obj = { ...newArray[index] }
  obj[name] = value;
  newArray[index] = obj;
  setTileData(newArray)
 }

 const handleAppend = () => {
  let newArray = [...tileData];
  newArray = [...newArray, tileDump];
  setTileData(newArray);
 }
 const handleDrop = (i) => {
  let newArray = [...tileData];
  newArray = newArray.filter((v, ind) => ind !== i);
  setTileData(newArray);
 }

 const handleSubmit = () => {
  if(!title || !icon || !iconUploaded) return alert("All fields are required!")
  const body ={
   title,
   iconUrl: icon,
   tileData,
   feedbackId
  }

  addCard({data: body, token: localStorage.getItem("token")})
  .then((response) => {
   props.getCards();
   props.close();
  })
  .catch((err) => {
   console.log("ERR ", err.message)
   alert("something went wrong!")
  })

 }

 return (
  <div>
   <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Add Card/Info</DialogTitle>
    <DialogContent>
     <TextField fullWidth autoFocus margin="dense" name="title" label="Title" type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
     />


     {icon &&
      <div style={{ width: "80px", height: "80px", margin: "10px" }} >
       <img style={{ width: "50px", height: "50px" }} src={icon} alt={"icon"} />
      </div>
     }

     {
      !iconUploaded &&
      (file && file.name ?
       <Button variant="contained" color="primary" onClick={() => uploadFile(file, "iconUlr")}>
        Upload Icon
      </Button>
       :
       <Button variant="contained" component="label">
        Select Icon
       <input type="file" accept="image/*" hidden onChange={onFileSelect} />
       </Button>)
     }


     <div style={{ margin: "20px" }}>
      <h4>Tile Data</h4>
      {
       tileData.map((tile, ind) => {
        return <TileDataRender
         {...tile}
         index={ind}
         onChange={handleOnChange}
         handleDrop={handleDrop}
        />
       })
      }
     </div>

     <Button onClick={handleAppend} variant="contained" color="primary" >Add More tiles</Button>

    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose} color="primary">Cancel</Button>
     <Button onClick={handleSubmit} color="primary">Add</Button>
    </DialogActions>
   </Dialog>
  </div>
 );
}


const TileDataRender = (props) => {
 const [iconUploaded, setIconUploaded] = useState(false);
 const [icon, setIcon] = useState("");
 const [file, setFile] = useState();


 const onFileSelect = (e) => {
  const { files } = e.target;
  setIcon(URL.createObjectURL(files[0]))
  setFile(files[0])
 }

 const uploadFile = async (file, name) => {
  var date = new Date();
  var promise = UploadToAWS({ Bucket: "osceai/cards", Key: `${name + date.toUTCString()+"_"+date.toLocaleTimeString()}.png`, Body: file }).promise();
  promise.then((data) => {
   setIcon(data.Location);
   if (name === "iconUlr") setIconUploaded(true)
   props.onChange(props.index, { name, value: data.Location })
   return;
  })
  promise.catch((err) => {
   console.log("ERR UPLOAD", err.message);
   alert("something went wrong!")
  })
 }

 return (
  <div key={props.index} style={{ padding: "5px" }}>
   {props.index > 0 &&
    <Button onClick={() => props.handleDrop(props.index)} color="secondary" variant="contained" >X</Button>
   }
   <TextField fullWidth margin="dense" name="title" label="Title" type="text"
    value={props.title}
    onChange={(e) => props.onChange(props.index, e.target)}
   />
   <TextField fullWidth margin="dense" name="text" label="Text" type="text"
    value={props.text}
    onChange={(e) => props.onChange(props.index, e.target)}
   />
   <TextField fullWidth margin="dense" name="position" label="Position" type="number"
    value={props.position}
    onChange={(e) => props.onChange(props.index, e.target)}
   />
   <div style={{ margin: "15px" }}>
    {icon &&
     <div style={{ width: "80px", height: "80px", margin: "10px" }} >
      <img style={{ width: "50px", height: "50px" }} src={icon} alt={"icon"} />
     </div>
    }
    {
     !iconUploaded &&
     (file && file.name ?
      <Button variant="contained" onClick={() => uploadFile(file, "iconUlr")}>
       Upload Icon
      </Button>
      :
      <Button variant="contained" component="label">
       Select Icon
       <input type="file" accept="image/*" hidden onChange={onFileSelect} />
      </Button>)
    }
   </div>
  </div>
 )
}