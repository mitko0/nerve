import React, {useState} from "react";
import moment from "moment";
import {Avatar, CardHeader} from "@material-ui/core";

import SimpleModal from "../Modal/SimpleModal";

const Challenge = props => {
    const [state, setState] = useState({
        open: false,
        showMore: false
    });

    const handleMoreClick = e => {
        e.preventDefault();
        setState({...state, open: true});
    };

    const onClose = () => {
        setState({...state, open: false})
    };

    const data = props.data;
    return (
        <div className={props.className}>
            {
                data && <div>
                    <CardHeader
                        avatar={
                            <Avatar
                                className='border border-danger'
                                title={data.sender.username}
                                src={`data:${data.sender.fileDetails.mimeType};base64,${data.sender.fileDetails.base64}`}
                            >
                                R
                            </Avatar>
                        }
                        title={
                            <div className='titles'>
                                <div className='description'>
                                    {data.challenge.description}
                                </div>
                                {
                                    props.showMore &&
                                    <a href='/'
                                       id='more'
                                       onClick={handleMoreClick}
                                    >
                                        more
                                    </a>
                                }
                            </div>
                        }
                        subheader={
                            <div className='small'>
                                <div>
                                    <span className='text-info'>Created: </span>
                                    {moment(data.challenge.id.createDate).local().calendar()}
                                </div>
                                <div>
                                    <span className='text-info'>Expires: </span>
                                    {moment(data.challenge.endDate).local().calendar()}
                                </div>
                            </div>
                        }
                    />

                    <SimpleModal
                        open={state.open}
                        onClose={onClose}
                        title={
                            <div className='text-info'>
                                Posted by {data.sender.username}
                            </div>
                        }
                        body={
                            <div>
                                <div>
                                    <span className='text-info'>Created: </span>
                                    {moment(data.challenge.id.createDate).calendar()}
                                </div>
                                <p>
                                    <span className='text-info'>Expires: </span>
                                    {moment(data.challenge.endDate).calendar()}
                                </p>
                                <div>{data.challenge.description}</div>
                            </div>
                        }
                    />
                </div>
            }
        </div>
    );
};

export default Challenge;