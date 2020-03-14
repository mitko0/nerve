import React, {Component} from "react";
import moment from "moment";

import ResponseService from "../repository/axiosResponseRepository";
import axios from "../axios/Axios";
import ts from "../repository/localStorage";
import RoleService from "../repository/axiosRoleRepository";
import StreakService from "../repository/axiosStreakRepository";
import UserService from "../repository/axiosUserRepository";
import SideBar from "../components/Navbar/SideBar";
import {BrowserRouter} from "react-router-dom";

class Test extends Component {

    submitHandler = e => {
        e.preventDefault();
        const key = {
            senderId: e.target['senderId'].value,
            receiverId: e.target['receiverId'].value
        };
        const date = e.target['challengedDate'].value;
        const media = e.target['media'].files[0];
        const res = e.target['responderId'].value;

        const id = {
            senderId: -1,
            receiverId: 1,
            createDate: '2020-03-13 17:58:53.566000'
        };
        debugger
        UserService.deleteUser(null, 'post_load').then(({data}) => {
            console.log(data);
        })
    };

    render() {
        return (
            <div>
                <BrowserRouter>
                    <SideBar/>
                </BrowserRouter>

                <form onSubmit={this.submitHandler} name='formicka' encType='multipart/form-data'>
                    <div className="file">
                        <label className="file-label">
                            <input name='media' className="file-input" type="file"/>
                            <span className="file-cta">
                          <span className="file-icon">
                                <i className="fa fa-upload"/>
                          </span>
                              <span className="file-label">
                                Choose a file…
                              </span>
                        </span>
                        </label>
                    </div>

                    <div className="field">
                        <label className="label">date</label>
                        <div className="control has-icons-left has-icons-right">
                            <input name='challengedDate' className="input is-success" type="datetime" placeholder="Text input"/>
                            <span className="icon is-small is-left">
                            <i className="fa fa-user"/>
                        </span>
                            <span className="icon is-small is-right">
                            <i className="fa fa-check"/>
                        </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">sender id</label>
                        <div className="control has-icons-left has-icons-right">
                            <input name='senderId' className="input is-success" type="text" placeholder="Text input"/>
                            <span className="icon is-small is-left">
                            <i className="fa fa-user"/>
                        </span>
                            <span className="icon is-small is-right">
                            <i className="fa fa-check"/>
                        </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">receiver id</label>
                        <div className="control has-icons-left has-icons-right">
                            <input name='receiverId' className="input is-success" type="text" placeholder="Text input"/>
                            <span className="icon is-small is-left">
                            <i className="fa fa-user"/>
                        </span>
                            <span className="icon is-small is-right">
                            <i className="fa fa-check"/>
                        </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">public responder</label>
                        <div className="control has-icons-left has-icons-right">
                            <input name='responderId' className="input is-success" type="text" placeholder="Text input"/>
                            <span className="icon is-small is-left">
                            <i className="fa fa-user"/>
                        </span>
                            <span className="icon is-small is-right">
                            <i className="fa fa-check"/>
                        </span>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}

export default Test;