import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UploadToAWS } from '../../constants/aws';
import { addCondition } from "../../services/conditions";

const tileDump = {
  text: "",
  title: "",
  iconUlr: "https://osceai.s3.ap-south-1.amazonaws.com/complaints/love%403x.png",
  thumbnailUrl: "https://osceai.s3.ap-south-1.amazonaws.com/thumbnails/love-2.png"
}
export default function FormDialog(props) {
  const { historyId } = useParams();
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [tileData, setTileData] = useState([tileDump, tileDump, tileDump, tileDump])

  useEffect(() => {
    // uploadFile()
  }, [])

  const handleClose = () => {
    setOpen(false);
    props.close();
  };


  const handleOnChange = (index, { value, name }) => {
    let newArray = [...tileData];
    let obj = { ...newArray[index] }
    obj[name] = value;
    newArray[index] = obj;
    setTileData(newArray)
  }

  const handleSubmit = () => {
    if (!title || !subTitle) return alert("Check form")
    const body = {
      title,
      subTitle,
      tileData,
      historyId,
      source: "web"
    }
    addCondition({ data: body, token: localStorage.getItem("token") })
      .then((response) => {
        props.getConditions();
        handleClose();
      })
      .catch((err) => {
        alert("something went wrong")
        console.log(err)
      })


  }

  return (
    <div>
      <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Condition</DialogTitle>
        <DialogContent>
          <TextField fullWidth autoFocus margin="dense" name="title" label="Title" type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField fullWidth margin="dense" name="subTitle" label="Sub Title" type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
          <div style={{ margin: "10px" }}>
            <h4>Tile Data</h4>
            {
              tileData.map((tile, ind) => {
                return <TileDataRender
                  {...tile}
                  index={ind}
                  onChange={handleOnChange}
                />
              })
            }
          </div>


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
  const [thumbUploaded, setThumbUploaded] = useState(false);
  const [icon, setIcon] = useState(tileDump.iconUlr);
  const [file, setFile] = useState();
  const [thumbnail, setThumbnail] = useState("");
  const [thumbFile, setThumbFile] = useState();
 
 
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
   var date = new Date();
   var promise = UploadToAWS({ Bucket: "osceai/condition", Key: `${name + date.toUTCString()+"_"+date.toLocaleTimeString() }.png`, Body: file }).promise();
   promise.then((data) => {
    setIcon(data.Location);
    if(name === "iconUlr") setIconUploaded(true)
    if(name === "thumbnailUrl") setThumbUploaded(true)
    props.onChange(props.index, { name, value: data.Location })
    return;
   })
   promise.catch((err) => {
    console.log("ERR UPLOAD", err.message);
    alert("something went wrong!")
   })
  }
 
  return (
   <div>
    <TextField fullWidth margin="dense" name="title" label="Title" type="text"
     value={props.title}
     onChange={(e) => props.onChange(props.index, e.target)}
    />
    <TextField fullWidth margin="dense" name="text" label="Text" type="text"
     value={props.text}
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
       <Button variant="contained" color="primary" onClick={() => uploadFile(file, "iconUlr")}>
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