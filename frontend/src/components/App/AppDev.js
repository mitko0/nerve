import React, {Component} from 'react';

import Challenge2 from "../Challenge/Challenge2";

import ChallengeService from "../../repository/axiosChallengeRepository";

class AppDev extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenges: []
        }
    }

    componentDidMount () {
        ChallengeService.search('mitko.1').then(response => {
            this.setState({challenges: response.data})
        });
    }

    render() {
        const a = ((1 !== 0)? <p>true</p> : <p>false</p>);
        return (
            /*<Challenge2 creator={this.state.challenges[0].challenge}
                        challenge={this.state.challenges[0].sender}
            />*/
            <div>
                {this.state.challenges.length !== 0? <Challenge2 creator={this.state.challenges[0].sender}
                                                                 challenge={this.state.challenges[0].challenge}
                /> : <p>asd</p>}
            </div>
        );
    }
}

export default AppDev;