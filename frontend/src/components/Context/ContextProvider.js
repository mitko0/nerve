import React, {Component} from 'react';

export const MyContext = React.createContext();

export class ContextProvider extends Component {
    state = {
        showNewChallengeModal: false
    };

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                handleShowNewChallengeModal: val => {
                    this.setState({showNewChallengeModal: val})
                }
            }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}