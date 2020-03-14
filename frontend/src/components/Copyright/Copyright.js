import React from "react";
import {
    Typography,
    Link
} from "@material-ui/core";

const Copyright = props => {
    return (
        <Typography
            variant="body2"
            color="textSecondary"
        >
            {'Copyright © '}
            <Link
                color="inherit"
                href="/">
                Nerve
            </Link>
            {' '}{new Date().getFullYear()}{'.'}
        </Typography>
    );
};

export default Copyright;