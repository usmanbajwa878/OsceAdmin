import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Nav(props) {
    const classes = useStyles();
    const {push} = useHistory();
    const logOut = (e) => {
        e.preventDefault();
        props.logOut();
        push("/");
    }
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" style={{ background: "gray" }}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>OSCEI</Typography>
                        <Button color="inherit" onClick={logOut} >Log OUT</Button>
                    </Toolbar>
                </AppBar>
            </div>
            {props.children}
        </>
    );
}
