import './App.css';
import '../../styles/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import React, {Component} from 'react';
import SignIn from '../Sign/SignIn';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import MyForm from "../../tests/form";
import Header from "../Header/Header";
import decode from 'jwt-decode';
import SignUp from "../Sign/SignUp";
import Post from "../Post/Post";
import Skeleton from "../Skeleton/Skeleton";

class App extends Component {
    checkToken = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return false;
        }
        try {
            let {exp} = decode(jwt);
            return exp < new Date().getTime();
        } catch (e) {
            return false;
        }
    };

    render() {
        let valid = this.checkToken();

        return (
            <div>
                <Header/>
                <Router>
                    <Switch>
                        <Route exact path="/home" >
                            <Skeleton center={Post}/>
                        </Route>

                        <Route exact path="/sign-up" component={SignUp}/>
                        <Route exact path="/sign-in" component={SignIn}/>

                        <Route exact path="/">
                            {valid? <Redirect to="/home" /> : <Redirect to="/sign-in" />}
                        </Route>
                        <Route path="/*" component={Error}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
