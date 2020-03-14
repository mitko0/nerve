import React from "react";

const InputError = (props) => {
    return (
        <div className='row d-flex align-items-center'>
            <div className='col-11 pr-0'>
                {props.children[0]}
            </div>
            <div className='col-1 pr-0'>
                {props.children[1]}
            </div>
        </div>
    );
};

export default InputError;