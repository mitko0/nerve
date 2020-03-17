import React from 'react';
import {
    Card,
} from '@material-ui/core';

import Challenge from "../Challenge/Challenge";
import Response from "../Response/Response";

const Post = props => {
    return (
        <Card raised className='card-response ml-auto mr-auto'>
            {
                props.data && <div>
                    <Challenge
                        data={props.data}
                        showMore={props.showMore}
                        className={props.className}
                    />
                    <Response
                        owner={props.data.sender.username}
                        challengeId={props.data.challenge.id}
                    />
                </div>
            }
        </Card>
    );
};

export default Post;