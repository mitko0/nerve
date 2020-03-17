import React, {Component} from 'react';

import Post from "../Post/Post";

import ChallengeService from "../../repository/axiosChallengeRepository";
import ChallengeAdd from "../Challenge/ChallengeAdd";
import LSService from "../../repository/localStorage";

class Public extends Component {
    state = {
        showModal: true,
        publicChallenges: []
    };

    handleNewChallenge = data => {
        const challenges = this.state.publicChallenges;
        const item = {
            challenge: data[0],
            sender: LSService.getItem('user')
        };
        challenges.unshift(item);
        this.setState({publicChallenges: challenges})
    };

    handleHide = () => {
        this.setState({showModal: false});
    };

    handleShow = () => {
        this.setState({showModal: true});
    };

    componentDidMount() {
        ChallengeService.forUser('for', -1, null).then(({data}) => {
            this.setState({publicChallenges: data});
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.publicChallenges.map((challenge, i) => {
                        return (
                            <Post
                                key={i}
                                data={challenge}
                                showMore
                                onNewChallenge={this.handleNewChallenge}
                            />
                        );
                    })
                }
                <ChallengeAdd
                    public
                    show={this.state.showModal}
                    onHide={this.handleHide}
                    onNewChallenge={this.handleNewChallenge}
                />
            </div>
        );
    }
}

export default Public;