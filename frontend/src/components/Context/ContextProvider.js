import React, {Component} from 'react';
import LSService from "../../repository/localStorage";
import UserService from "../../repository/axiosUserRepository";

export const MyContext = React.createContext();

export class ContextProvider extends Component {
    state = {
        sectionNo: 0,
        showNewChallengeModal: false,
        publicChallenges: [],
        pageNo: 0,
        listSize: 5,
        last: false
    };

    render() {
        return (
            <MyContext.Provider value={{
                userValidationRegex: {
                    username: /^[a-zA-Z0-9!.=_]{4,}$/,
                    usernameNR: /^([a-zA-Z0-9!.=_]{4,})?$/,
                    email: /(^(?![\s\S])|(^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$))/,
                    password: /.{4,}/,
                    passwordNR: /^(.{4,})?$/
                },
                userValidationMessages: {
                    username: "Username needs to be at least 4 characters long and can contain only numbers, letters and ! . = _",
                    minLength: "Minimum length is 4",
                    email: "Invalid email",
                    mismatch: "Passwords do not match"
                },
                state: this.state,
                handleShowNewChallengeModal: val => {
                    this.setState({showNewChallengeModal: val})
                },
                handleSectionNoChange: no => {
                    this.setState({sectionNo: no})
                },
                handlePublicChallengesUpdate: (challenges, last) => {
                    const {pageNo} = this.state;
                    this.setState({publicChallenges: challenges, last: last, pageNo: pageNo + 1});
                },
                handleNewChallenge: (data, beginning = true) => {
                    const challenges = this.state.publicChallenges;
                    const item = {
                        challenge: data[0],
                        sender: LSService.getItem('user')
                    };
                   beginning
                       ? challenges.unshift(item)
                       : challenges.push(item);
                    this.setState({publicChallenges: challenges})
                },
                handleWsChallengeResponse: async data => {
                    const challenges = this.state.publicChallenges;
                    const currentUser = LSService.getItem('user');
                    let sender = data.id.senderId === currentUser.id
                    ? currentUser
                        : await UserService.getUser(data.id.senderId);
                    const item = {
                        challenge: data,
                        sender: sender.data ? sender.data : sender
                    };
                    challenges.push(item);
                    this.setState({publicChallenges: challenges})
                }
            }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}