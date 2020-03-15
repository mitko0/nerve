import React, {Component} from 'react';

import Post from "../Post/Post";

import ChallengeService from "../../repository/axiosChallengeRepository";

class Public extends Component {
    state = {
        publicChallenges: []
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
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default Public;