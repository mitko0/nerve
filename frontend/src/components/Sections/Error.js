import React from 'react';
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div
            className='d-flex flex-column align-items-center justify-content-center'
            style={{height: '100vh'}}
        >
            <h1 className='text-success'>Unexpected Error :(</h1>
            <p>
                You can go back to our&nbsp;
                <Link to={'/'}>Homepage</Link>
            </p>
            <i className='fas fa-cogs fa-4x text-success'/>
        </div>
    );
};

export default Error;