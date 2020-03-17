import React, {Component} from "react";
import ChallengeService from "../repository/axiosChallengeRepository";

class Test extends Component {
    componentDidMount() {
        ChallengeService.newChallenges(1, [1,2,4], 'axios test').then(({data}) => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
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