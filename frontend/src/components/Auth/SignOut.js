import React from 'react';
import {Redirect} from "react-router";

import LSService from "../../repository/localStorage";

const SignOut = () => {
    LSService.clearLS();

    return (
        <Redirect to={'/sign-in'} />
    );
};

export default SignOut;