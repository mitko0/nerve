import React, {useContext, useEffect} from 'react';
import Stomp from "stompjs";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "../Post/Post";
import {MyContext} from '../Context/ContextProvider';

import ChallengeService from "../../repository/axiosChallengeRepository";
import LSService from "../../repository/localStorage";

const Public = () => {
    const context = useContext(MyContext);

    const fetchData = () => {
        const {pageNo, listSize, publicChallenges} = context.state;
        ChallengeService.pagedForUserId(-1, pageNo, listSize).then(({data}) => {
            const dd = [...publicChallenges, ...data.content];
            context.handlePublicChallengesUpdate(dd, data.last);
        });
    };

    useEffect(() => {
        context.handleSectionNoChange(0);
        context.state.publicChallenges.length === 0
        && ChallengeService.pagedForUserId(-1).then(({data}) => {
            context.handlePublicChallengesUpdate(data.content, data.last);
        });

        const ws = ("ws://localhost:8080/ws");
        let client = Stomp.client(ws);
        client.connect({}, () => {
                client.subscribe("/topic/public", ({body}) => {
                    const challengeUsers = JSON.parse(body);

                    challengeUsers.id.senderId !== LSService.getItem('user').id
                    && challengeUsers.id.receiverId === -1
                    && context.handleWsChallengeResponse(challengeUsers);
                })
            }
        );

        return () => client.disconnect();
    }, []);

    return (
        <div>
            <InfiniteScroll
                dataLength={context.state.publicChallenges.length}
                next={fetchData}
                hasMore={!context.state.last}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
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
            </InfiniteScroll>
        </div>
    );
};

export default Public;