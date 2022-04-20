/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
 root: {
  width: 500,
  '& > * + *': {
   marginTop: theme.spacing(3),
  },
 },
}));

export default function Tags(props) {
 const classes = useStyles();
 const [options, setOptions] = useState([])
 return (
  <div className={classes.root}>
   <Autocomplete
    multiple
    id="tags-filled"
    options={options.map((option) => option.title)}
    freeSolo
    renderTags={(value, getTagProps) =>
     value.map((option, index) => (
      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
     ))
    }
    onChange={props.onChange}
    renderInput={(params) => (
     <TextField {...params} variant="outlined" label={props.label} placeholder={props.placeholder} />
    )}
   />
  </div>
 );
}
