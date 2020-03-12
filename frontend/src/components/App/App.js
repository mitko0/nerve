import './App.css';
import '../../styles/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import React, {Component} from 'react';
import SignIn from '../Sign/SignIn';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Header from "../Header/Header";
import SignUp from "../Sign/SignUp";
import Skeleton from "../Skeleton/Skeleton";
import ts from "../../repository/localStorage";
import ChallengeService from "../../repository/axiosChallengeRepository";
import Post from "../Post/Post";

class App extends Component {
    constructor(params) {
        super(params);
        this.state = {
            challenges: []
        }
    }

    getChallenges = () => {
        ChallengeService.forUser('for', -1,).then((response) => {
            this.setState({
                challenges: response.data
            });
        })
    };

    componentDidMount() {
        this.getChallenges();
    }

    render() {
        let valid = ts.checkToken();
        const posts = this.state.challenges.map((obj, i) => {
            return (
                <Post key={i}
                      rating={2}
                      name={i.toString()}
                      title={'asdas'}
                      owner={obj.sender.username}
                      challengeId={obj.challenge.id}
                      description={obj.challenge.description}
                      avatarSrc={obj.sender.profilePicLocation}
                      avatarAlt={obj.sender.username.charAt(0)}
                />
            );
        });

        return (
            <div>
                <Header positon="fixed"/>
                <Router>
                    <Switch>
                        <Route exact path="/home">
                            <Skeleton>
                                {posts}
                            </Skeleton>
                        </Route>

                        <Route exact path="/sign-up" component={SignUp}/>
                        <Route exact path="/sign-in" component={SignIn}/>

                        <Route exact path="/">
                            {valid ? <Redirect to="/home"/> : <Redirect to="/sign-in"/>}
                        </Route>
                        <Route path="/*" component={Error}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
