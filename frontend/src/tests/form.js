import React, {Component} from "react";
import UserService from "../repository/axiosUserRepository";

class MyForm extends Component{

    formSubmit = (event) => {
        event.preventDefault();
        debugger
        const picture = event.target.pic.value;
        const user = {
            "username": event.target.username.value,
            "password": event.target.password.value,
            "email": event.target.email.value
        };

        /*UserService.createUser(user, picture).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })*/
        UserService.createUser(user, picture).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    };

    render() {
        return (
            <div className={"container"}>
                <form onSubmit={this.formSubmit}>
                    <div className="form-row">
                       {/* <div className="form-group col-md-6">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" name="username" />
                        </div>*/}
                        <div className="form-group col-md-6">
                            <label htmlFor="key">Id</label>
                            <input type="number" className="form-control" id="key" name="id" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" name="username" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" name="password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name={"email"} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" name={"pic"} />
                                <label className="custom-file-label"
                                       htmlFor="inputGroupFile01"
                                style={{zIndex: 10}}>
                                    Choose file
                                </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div>
        );
    }
}

export default MyForm;