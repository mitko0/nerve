import React, {useContext, useEffect} from 'react';

import Post from "../Post/Post";
import {MyContext} from '../Context/ContextProvider';

import ChallengeService from "../../repository/axiosChallengeRepository";

const Public = () => {
    const context = useContext(MyContext);

    useEffect(() => {
        context.handleSectionNoChange(0);
        ChallengeService.forUser('for', -1, null).then(({data}) => {
            context.handlePublicChallengesUpdate(data);
        });
    }, []);

    return (
        <div>
            {
                context.state.publicChallenges.map((challenge, i) => {
                    return (
                        <Post
                            key={i}
                            id={i}
                            data={challenge}
                            showMore
                        />
                    );
                })
            }
        </div>
    );
};

export default Public;