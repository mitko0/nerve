import React from "react";
import { Avatar } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";

const Challenge2 = (props) => {
    const challenge = props.challenge;
    const creator = props.creator;

    const src = `data:${creator.fileDetails.mimeType};base64,${creator.fileDetails.base64}`;

    return (
        <div className='p-3' style={{width: '300px'}}>
            {/*<div className='d-inline-block mr-3'>
                <Avatar alt={creator.username}
                        src={src}
                />
            </div>
            <div className='d-inline-block'>
                <div>{creator.username}</div>
                <div className='text-muted small d-inline-block .details'>
                    {challenge.description}
                </div>
            </div>
            <button className='btn btn-link p-0'>more</button>*/}
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" >
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"

            />
        </div>
    );
};

export default Challenge2;