import React, {Component} from "react";
import UserService from "../repository/axiosUserRepository";
import {BrowserRouter as Router} from "react-router-dom";
import Skeleton from "../components/Skeleton/Skeleton";
import Challenge from "../components/Challenge/Challenge";
import ChallengeService from "../repository/axiosChallengeRepository";
import Response from "../components/Response/Response";
import Post from "../components/Post/Post";
import ResponseService from "../repository/axiosResponseRepository";
import LSService from "../repository/localStorage";
import ChallengeAdd from "../components/Challenge/ChallengeAdd";

class Test extends Component {
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            /*<Router>
                <Skeleton className=''>
                    <ChallengeAdd/>
                </Skeleton>
            </Router>*/
            <div>
                asd
                {this.props.idk}
            </div>
        );
    };
}

export default Test;