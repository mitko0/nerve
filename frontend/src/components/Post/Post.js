import React from 'react';
import qs from 'qs';
import {
    Card,
} from '@material-ui/core';

import Challenge from "../Challenge/Challenge";
import Response from "../Response/Response";

const Post = props => {
    return (
        <Card raised className='card-response ml-auto mr-auto'>
            {
                props.data && <div key={qs.stringify(props.data.challenge.id, {allowDots: true})}>
                    <Challenge
                        data={props.data}
                        showMore={props.showMore}
                        className={props.className}
                    />
                    <Response
                        id={props.id}
                        owner={props.data.sender.username}
                        challenge={props.data.challenge}
                    />
                </div>
            }
        </Card>
    );
};

export default Post;