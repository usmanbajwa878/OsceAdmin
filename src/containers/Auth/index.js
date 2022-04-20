import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { Login } from "../../services/auth";
import { PinDropSharp } from '@material-ui/icons';

export default function SignIn(props) {
 const classes = useStyles();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setloading] = useState(false);

 const handleChange = ({ target }) => {
  if (target.name === "email") return setEmail(target.value);
  return setPassword(target.value)

 }

 const hanldeSubmit = async (e) => {
  e.preventDefault();
  setloading(true);
  var data = new FormData();
  data.append('email', email);
  data.append('password', password);
  await new Promise(async (resolve) => {
   const response = await Login(data);
   if(response.status) props.logIn();
   resolve();
  })
 }
 return (
  <Container component="main" maxWidth="xs">
   <CssBaseline />
   <div className={classes.paper}>
    <Avatar className={classes.avatar}>
     <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">SIGN IN</Typography>
    <form className={classes.form} noValidate onSubmit={hanldeSubmit} onChange={handleChange}>
     <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
     />
     <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
     />
     <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
     >
      Sign In
     </Button>
    </form>
   </div>
  </Container>
 );
}

const useStyles = makeStyles((theme) => ({
 paper: {
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
 },
 avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
 },
 form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
 },
 submit: {
  margin: theme.spacing(3, 0, 2),
 },
}));
