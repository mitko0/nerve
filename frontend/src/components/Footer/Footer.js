import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Copyright from "../Copyright/Copyright";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0
    },
    footer: {
        padding: theme.spacing(3, 2),
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <footer className={classes.footer}>
                <Grid container justify={"center"}>
                    <Grid item>
                        <Copyright />
                    </Grid>
                </Grid>
            </footer>
        </div>
    );
}