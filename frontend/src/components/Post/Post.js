import React from 'react';
import {
    Card,
    CardActions,
    IconButton,
} from '@material-ui/core';
import PostAdd from '@material-ui/icons/PostAdd';

import Challenge from "../Challenge/Challenge";
import Response from "../Response/Response";

const Post = props => {
    const handlePostClick = () => {
        console.log('asd');
    };

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