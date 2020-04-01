import React from 'react';
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
import Message from "../Sections/Message";
import Profile from "../Sections/Profile";
import Admin from "../Sections/Admin";
import Error from "../Sections/Error";

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

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        LSService.checkToken()
        && LSService.isUserAdmin()
        && <Component {...props} {...rest} />
    )}/>
);

const App = () => {
    return (
        <ContextProvider>
            <div className=''>
                <Router>
                    <Switch>
                        <Route exact path='/sign-up' component={SignUp}/>
                        <Route exact path='/sign-in' component={SignIn}/>
                        <Route exact path='/sign-out' component={SignOut}/>
                        <Route exact path='/error' component={Error}/>

                        <Skeleton>
                            <Switch>
                                <PrivateRoute exact path='/' component={Public}/>
                                <PrivateRoute exact path='/home' component={Public}/>
                                <PrivateRoute exact path='/dn' component={Private}/>
                                <PrivateRoute exact path='/dn/:id' component={Message}/>
                                <PrivateRoute exact path='/profile' component={Profile}/>
                                <AdminRoute exact path='/admin' component={Admin}/>
                                <Route path='*' render={() =>
                                    <Redirect to={'/error'}/>
                                }/>
                            </Switch>
                        </Skeleton>
                    </Switch>
                </Router>
            </div>
        </ContextProvider>
    );
};

export default App;
