import React, {Component} from "react";

class ErrorInput extends Component{
    render() {
        return (
            <div className='row d-flex align-items-center'>
                <div className='col-11 pr-0'>
                    {this.props.children[0]}
                </div>
                <div className='col-1 pr-0'>
                    {this.props.children[1]}
                </div>
            </div>
        );
    }
}

export default ErrorInput;