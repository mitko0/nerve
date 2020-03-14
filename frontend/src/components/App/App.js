import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import SignIn from '../Auth/SignIn';
import SignUp from "../Auth/SignUp";
import Skeleton from "../Skeleton/Skeleton";

import ts from "../../repository/localStorage";

class App extends Component {
    state = {
        id: 1
    };

    handleRedirect = id => {
        this.setState({id: id})
    };

    render() {
        let valid = ts.checkToken();

        return (
            <div className='dev-b'>
                <Router>
                    <Switch>
                        <Route exact path="/sign-up" component={SignUp}/>
                        <Route exact path="/sign-in" component={SignIn}/>
                        <Route exact path="/sign-out">
                            <Redirect to="/sign-in"/>
                        </Route>
                        <Skeleton id={this.state.id}>
                            <Route exact path="/">
                                {valid ? <Redirect to="/home"/> : <Redirect to="/sign-in"/>}
                            </Route>
                            <Route exact path="/home">
                                <p>home</p>
                            </Route>
                            <Route exact path='/profile'>
                                <p>profile</p>
                            </Route>
                            <Route exact path='/dn'>
                                <p>dn</p>
                            </Route>
                        </Skeleton>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
