import React, {Component} from 'react';
import moment from "moment";
import {Media} from "react-bootstrap";
import {Avatar, Button} from "@material-ui/core";

import {MyContext} from "../Context/ContextProvider";
import ChallengeAdd from "../Challenge/ChallengeAdd";

import ChallengeService from "../../repository/axiosChallengeRepository";
import StreakService from "../../repository/axiosStreakRepository";
import LSService from "../../repository/localStorage";
import GlobalService from "../../repository/GlobalService";

class Private extends Component {
    static contextType = MyContext;
    user = LSService.getItem('user');

    state = {
        messages: [],
        messageMap: new Map(),
        streakMap: new Map(),
        showAddModal: false
    };

    handleMessageOnClick = id => {
        this.props.history.push({
            pathname: `/dn/${id}`,
            state: {challenges: this.state.messageMap.get(id)}
        });
    };

    handleShowModal = val => {
        this.setState({showAddModal: val})
    };

    handleNewChallenges = (data, receiversMap) => {
        const {messages} = this.state;
        const currentUser = LSService.getItem('user');

        data.forEach(item => {
            let obj = {
                challenge: item,
                receiver: receiversMap.get(item.id.receiverId),
                sender: currentUser
            };
            messages.unshift(obj);
        });
        const newMessageMap = GlobalService.groupBy(messages, obj => obj.challenge.id.senderId !== currentUser.id, obj => obj.sender.id, obj => obj.receiver.id);
        this.setState({messageMap: newMessageMap, messages: messages})
    };

    loadMessages = () => {
        const userId = this.user.id;
        ChallengeService.forUser('for', this.user.id).then(({data}) => {
            data = data.filter(obj => obj.receiver.id !== -1);
            let map = GlobalService.groupBy(data, obj => obj.challenge.id.senderId !== userId, obj => obj.sender.id, obj => obj.receiver.id);
            this.setState({messages: data, messageMap: map});
        });

        StreakService.getForId(this.user.id).then(({data}) => {
            let map = GlobalService.groupBy(data, obj => obj.id.user1Id !== userId, obj => obj.id.user1Id, obj => obj.id.user2Id);
            this.setState({streakMap: map});
        })
    };

    componentDidMount = async () => {
        this.context.handleSectionNoChange(1);
        this.loadMessages();
    };

    render() {
        const {streakMap, messageMap, showAddModal} = this.state;
        return (
            <>
                <div className='border'>
                    <ChallengeAdd
                        show={showAddModal}
                        onNewChallenge={this.handleNewChallenges}
                        onHide={() => this.handleShowModal(false)}
                    />
                    <Button
                        fullWidth
                        color='secondary'
                        variant='contained'
                        className='p-3'
                        onClick={() => this.handleShowModal(true)}
                    >
                        Challenge
                    </Button>
                    {[...messageMap.values()].map((item, i) => {
                        const key = item[0].challenge.id.senderId !== this.user.id
                            ? item[0].sender.id
                            : item[0].receiver.id;
                        const sMapSize = streakMap.size;

                        return <Media
                            key={i}
                            className='p-3 mt-0 cursor-pointer hover-dim'
                            onClick={() => this.handleMessageOnClick(key)}
                        >
                            <Avatar
                                className='border border-danger mr-2'
                                src={
                                    this.user.id !== item[0].receiver.id
                                        ? `data:${item[0].receiver.fileDetails.mimeType};base64,${item[0].receiver.fileDetails.base64}`
                                        : `data:${item[0].sender.fileDetails.mimeType};base64,${item[0].sender.fileDetails.base64}`
                                }
                            />
                            <Media.Body className='control d-flex justify-content-between'>
                                <span>
                                    {this.user.id !== item[0].receiver.id
                                        ? <span className='mr-2'>{item[0].receiver.username}</span>
                                        : <span className='mr-2'>{item[0].sender.username}</span>
                                    }
                                    {sMapSize !== 0
                                    && streakMap.has(key)
                                    && streakMap.get(key)[0].streak > 1
                                    && streakMap.get(key)[0].streak}
                                    {sMapSize !== 0
                                    && streakMap.has(key)
                                    && <i className='fa fa-fire text-danger'/>}
                                </span>
                                <span>
                                    {moment(item[0].challenge.version).fromNow()}
                                </span>
                            </Media.Body>
                        </Media>
                    })}
                </div>
            </>
        );
    }
}

export default Private;