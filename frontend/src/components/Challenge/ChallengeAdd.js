import React, {Component} from 'react';
import moment from "moment";
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';
import {
    Button,
    Media,
    Modal
} from 'react-bootstrap'
import {
    Avatar,
} from "@material-ui/core";

import {MyContext} from '../Context/ContextProvider';
import InputSearch from "../CustomInput/InputSearch";
import ChallengeService from "../../repository/axiosChallengeRepository";

import LSService from "../../repository/localStorage";
import context from "react-router/modules/RouterContext";

class ChallengeAdd extends Component {
    state = {
        users: new Map(),
        selectedDate: moment(),
        validDate: true,
        description: '',
    };

    handleDateChange = date => {
        const valid = date && date.isValid();
        this.setState({selectedDate: date, validDate: valid});
    };

    handleErrorDate = () => {
        this.setState({validDate: false});
    };

    handleSelect = user => {
        const {users} = this.state;
        users.set(user.id, user);
        this.setState({users: users});
    };

    handleDescriptionChange = e => {
        this.setState({description: e.target.value});
    };

    handleRemove = key => {
        const {users} = this.state;
        users.delete(key);
        this.setState({users: users});
    };

    handleFormSubmit = e => {
        e.preventDefault();

        const {users} = this.state;
        const user = LSService.getItem('user');
        const receivers = this.props.public ? [-1] : [...users.keys()];

        ChallengeService.newChallenges(
            user.id,
            receivers,
            e.target.description.value,
            e.target.endDate.value)
            .then(({data}) => {
                this.props.onNewChallenge(data);
            }).catch(err => {
            console.log(err);
        });
        this.setState({description: '', selectedDate: moment()});
    };

    render() {
        const userFileDetails = LSService.getItem('user').fileDetails;
        const {users, description, selectedDate, validDate} = this.state;
        return (
            <MyContext.Consumer>
                {context => (
                    <>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Modal
                                size={"lg"}
                                backdropClassName='bg-danger'
                                show={context.state.showNewChallengeModal}
                                onHide={() => context.handleShowNewChallengeModal(false)}
                            >
                                <Modal.Header closeButton/>
                                <Modal.Body>
                                    {
                                        !this.props.public
                                        && <InputSearch
                                            data={users}
                                            onSelect={this.handleSelect}
                                            onRemove={this.handleRemove}
                                        />
                                    }
                                    <form onSubmit={this.handleFormSubmit}>
                                        <Media>
                                            <Avatar
                                                className='border border-danger mr-2'
                                                src={`data:${userFileDetails.mimeType};base64,${userFileDetails.base64}`}
                                            >
                                                R
                                            </Avatar>
                                            <Media.Body className='control'>
                                        <textarea
                                            value={description}
                                            onChange={this.handleDescriptionChange}
                                            name='description'
                                            className="textarea border-0"
                                            placeholder="Go easy on them..."
                                        />
                                                <KeyboardDateTimePicker
                                                    fullWidth
                                                    autoOk
                                                    disablePast
                                                    required
                                                    value={selectedDate}
                                                    variant="inline"
                                                    margin="normal"
                                                    id="endDate"
                                                    name="endDate"
                                                    label="Challenge end date"
                                                    format='YYYY-MM-DD HH:mm'
                                                    onChange={this.handleDateChange}
                                                    onError={this.handleErrorDate}
                                                />
                                                <div className='d-flex justify-content-end mt-3'>
                                                    <Button
                                                        disabled={
                                                            description.length === 0
                                                            || !validDate
                                                            || (!this.props.public && users.size === 0)
                                                        }
                                                        type="submit"
                                                        className='mt-1'
                                                        variant="danger"
                                                        onClick={() => context.handleShowNewChallengeModal(false)}
                                                    >
                                                        Challenge
                                                    </Button>
                                                </div>
                                            </Media.Body>
                                        </Media>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </MuiPickersUtilsProvider>
                    </>
                )}
            </MyContext.Consumer>
        );
    }
}

export default ChallengeAdd;