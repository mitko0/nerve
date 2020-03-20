import React from "react";
import {
    CircularProgress,
    Button
} from "@material-ui/core";

const ButtonLoad = (props) => {
    return (
        <Button
            disabled={props.disabled}
            type={props.type || 'button'}
            fullWidth={props.fullWidth}
            variant={props.variant}
            color={props.color}
            className={props.className}
            tabIndex={props.tabIndex}
            onClick={props.onClick}
        >
            {
                props.loading ?
                    <CircularProgress size={props.radius || '24px'}/> :
                    <span>{props.text || props.children}</span>
            }
        </Button>
    );
};

export default ButtonLoad;