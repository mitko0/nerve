import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import Skeleton from "../Skeleton/Skeleton";
import SignUp from "../Auth/SignUp";
import SignIn from '../Auth/SignIn';
import Public from "../Sections/Public";
import Private from "../Sections/Private";
import Profile from "../Sections/Profile";

import LSService from "../../repository/localStorage";
import SignOut from "../Auth/SignOut";


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        LSService.checkToken()
            ? <Component {...props} {...rest} />
            : <Redirect to={{
                pathname: '/sign-in',
                state: { from: props.location }
            }} />
    )}/>
);

class App extends Component {
    state = {
        id: 1
    };

    handleRedirect = id => {
        this.setState({id: id})
    };

    render() {
        return (
            <div className=''>
                <Router>
                    <Switch>
                        <Route exact path='/sign-up' component={SignUp} />
                        <Route exact path='/sign-in' component={SignIn} />
                        <Route exact path='/sign-out' component={SignOut} />

                        <Skeleton id={this.state.id}>
                            <PrivateRoute exact path='/' component={Public} />
                            <PrivateRoute exact path='/home' component={Public} />
                            <PrivateRoute exact path='/dn' component={Private} />
                            <PrivateRoute exact path='/profile' component={Profile} />
                        </Skeleton>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
