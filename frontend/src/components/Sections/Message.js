import React, {useContext, useEffect} from 'react';
import Post from "../Post/Post";
import {MyContext} from "../Context/ContextProvider";
import LSService from "../../repository/localStorage";
import {Link} from "react-router-dom";

const Message = props => {
    const context = useContext(MyContext);

    useEffect(() => {
        context.handleSectionNoChange(1);
        // document.getElementById('bot').scrollIntoView({ behavior: "smooth" })
    }, []);

    return (
        <>
            <div className='border'>
                {
                    props.location.state
                    && <>
                        <div
                            className='position-sticky border p-3 top-0'
                            style={{backgroundColor: '#e6ecf0', zIndex: 100}}
                        >
                            <h2>
                                <Link to={'/dn'}>
                                    <i className='text-danger fas fa-long-arrow-alt-left mr-2'/>
                                </Link>
                                {LSService.getItem('user').id !== props.location.state.challenges[0].receiver.id
                                    ? props.location.state.challenges[0].receiver.username
                                    : props.location.state.challenges[0].sender.username
                                }
                            </h2>
                        </div>
                        <div>
                            {props.location.state.challenges.map((challenge, i) => {
                                return (
                                    <Post
                                        key={i}
                                        id={i}
                                        data={challenge}
                                        showMore
                                    />
                                );
                            })}
                        </div>
                        <div id='bot'/>
                    </>
                }
            </div>
        </>
    );
};

export default Message;