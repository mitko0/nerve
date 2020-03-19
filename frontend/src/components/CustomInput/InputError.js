import React from "react";

const InputError = props => {
    return (
        <div className='row d-flex align-items-center'>
            <div className={'pr-0 col-' + (props.size || '11')}>
                {props.children[0] || props.children}
            </div>
            <div className={'pr-0 col-' + (12 - props.size || '1')}>
                {props.children[1]}
            </div>
        </div>
    );
};

export default InputError;