import React from "react";
import {
    CircularProgress,
    Button
} from "@material-ui/core";

const ButtonLoad = (props) => {
    return (
        <Button
            disabled={props.disabled}
            type={props.type}
            fullWidth={props.fullWidth}
            variant={props.variant}
            color={props.color}
            className={props.className}
            tabIndex={props.tabIndex}
        >
            {
                props.loading ?
                    <CircularProgress size={props.radius}/> :
                    <span>{props.text || props.children}</span>
            }
        </Button>
    );
};

export default ButtonLoad;