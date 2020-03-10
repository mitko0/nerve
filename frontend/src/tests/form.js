import React, {Component} from "react";
import UserService from "../repository/axiosUserRepository";
import {useHistory} from 'react-router-dom';
import SignUp from "../components/Sign/SignUp";
import SignIn from "../components/Sign/SignIn";
import { createHashHistory } from "history";

class MyForm extends Component {
    formSubmit = (event) => {
        event.preventDefault();
        UserService.searchUsers('mitk').then((response) => {
            debugger
            console.log(response);
        }).catch((error) => {
            if (error.response.status === 403) {
                window.location.href = '/sign-in'
            }
        });
    };

    render() {
        return (
            <form onSubmit={this.formSubmit}>
                <input type='submit' />
            </form>
        );
    }
}

export default MyForm;