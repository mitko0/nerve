import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";

const ErrorMessage = (props) => {
    return (
        <div>
            <Tooltip
                arrow
                title={props.title}
                disableFocusListener
                placement="right"
            >
                   <span
                       id={"tooltip"}
                       className='text-danger hover fa fa-info-circle'
                       style={{fontSize: "19px"}}
                       data-toggle="tooltip"
                       data-placement="top"
                   />
            </Tooltip>
        </div>
    );
};

export default ErrorMessage;