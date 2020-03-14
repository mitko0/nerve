import React from 'react';
import {
    makeStyles,
    CssBaseline,
    Grid
} from '@material-ui/core';

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

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <footer className={classes.footer}>
                <Grid
                    container
                    justify={"center"}
                >
                    <Grid item>
                        <Copyright/>
                    </Grid>
                </Grid>
            </footer>
        </div>
    );
}

export default Footer;