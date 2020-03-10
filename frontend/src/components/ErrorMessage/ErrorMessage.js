import React, {Component} from 'react';
import Tooltip from "@material-ui/core/Tooltip";

class ErrorMessage extends Component {
    render() {
        return (
            <div>
                <Tooltip title={this.props.title} arrow disableFocusListener placement="right">
                   <span id={"tooltip"}
                         className='text-danger hover fa fa-info-circle'
                         style={{fontSize: "19px"}}
                         data-toggle="tooltip"
                         data-placement="top"/>
                </Tooltip>
            </div>
        );
    }
}

export default ErrorMessage;