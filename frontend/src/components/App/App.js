import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import {ContextProvider} from "../Context/ContextProvider";
import Skeleton from "../Skeleton/Skeleton";
import SignUp from "../Auth/SignUp";
import SignIn from '../Auth/SignIn';
import SignOut from "../Auth/SignOut";
import Public from "../Sections/Public";
import Private from "../Sections/Private";
import Profile from "../Sections/Profile";
import Admin from "../Sections/Admin";

import LSService from "../../repository/localStorage";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        LSService.checkToken()
            ? <Component {...props} {...rest} />
            : <Redirect to={{
                pathname: '/sign-in',
                state: {from: props.location}
            }}/>
    )}/>
);

class App extends Component {

    render() {
        return (
            <ContextProvider>
                <div className=''>
                    <Router>
                        <Switch>
                            <Route exact path='/sign-up' component={SignUp} />
                            <Route exact path='/sign-in' component={SignIn} />
                            <Route exact path='/sign-out' component={SignOut} />

                            <Skeleton>
                                <PrivateRoute exact path='/' component={Public} />
                                <PrivateRoute exact path='/home' component={Public} />
                                <PrivateRoute exact path='/dn' component={Private} />
                                <PrivateRoute exact path='/profile' component={Profile} />
                                {LSService.isUserAdmin() && <PrivateRoute exact path='/admin' component={Admin} />}
                            </Skeleton>
                        </Switch>
                    </Router>
                </div>
            </ContextProvider>
        );
    }
}

export default App;
