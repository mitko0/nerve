import React from 'react';
import {Link as ReactLink} from 'react-router-dom'
import {
    Avatar,
    CssBaseline,
    Grid,
    Typography,
    makeStyles,
    Container,
    Card,
    CardContent
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Footer from "../Footer/Footer";


const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

const SignFooter = (props) => {
    return (
        <Card raised
              className='mt-3'>
            <CardContent>
                <Grid container
                      justify={"center"}>
                    <Grid item>
                        {props.description}
                        &nbsp;
                        <ReactLink to={props.to} className='text-danger'>{props.linkText}</ReactLink>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default function Sign(props) {
    const classes = useStyles();

    const footer = (
        <SignFooter
            description={props.description}
            to={props.to}
            linkText={props.linkText}
        />
    );

    return (
        <div
            className='d-flex align-items-center justify-content-center'
            style={{height: '90vh', minHeight: '800px'}}
        >
            <Container
                maxWidth='xs'
                className='mb-9 mt-9'
            >
                <CssBaseline/>
                <Card raised>
                    <CardContent>
                        <Grid
                            container
                            justify={"center"}
                        >
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                        </Grid>
                        <Grid
                            container
                            justify={"center"}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                            >
                                {props.title}
                            </Typography>
                        </Grid>
                        {props.children}
                    </CardContent>
                </Card>
                {props.footer && footer}
            </Container>
            <Footer/>
        </div>
    );
}