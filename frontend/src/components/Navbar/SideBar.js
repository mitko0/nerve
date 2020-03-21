import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
    MenuList,
    Typography,
    MenuItem
} from "@material-ui/core";

import {MyContext} from '../Context/ContextProvider';
import ChallengeAdd from "../Challenge/ChallengeAdd";
import LSService from "../../repository/localStorage";

class SideBar extends Component {
    static contextType = MyContext;
    state = {
        arr: [
            {id: 0, to: '/home', fa: 'fa-home', text: 'Home'},
            {id: 1, to: '/dn', fa: 'fa-envelope', text: 'Direct neurons'},
            {id: 2, to: '/profile', fa: 'fa-user', text: 'Profile'},
            {id: 3, to: '/sign-out', fa: 'fa-sign-out-alt', text: 'Sign out'},
        ],
        admin: {id: 4, to: '/admin', fa: 'fa-user-cog', text: 'Admin'},

    };

    render() {
        const {arr} = this.state;

        return (
            <MyContext.Consumer>
                {context => (
                    <>
                        <div
                            className={this.props.className}
                            style={{maxHeight: 390}}
                        >
                            <MenuList className='d-inline-block'>
                                <Typography className='mt-2 mb-2'>
                                    <Link to={'/'}>
                                        <img
                                            src='../../nerve-logo.png'
                                            alt={'logo'}
                                            width={'60px'}
                                        />
                                    </Link>
                                </Typography>
                                {
                                    LSService.isUserAdmin()
                                    && <MenuItem
                                        key={this.state.admin.id}
                                        component={Link}
                                        to={this.state.admin.to}
                                        color='primary'
                                        className=
                                            {
                                                context.state.sectionNo === this.state.admin.id
                                                    ? 'mb-2 button is-rounded is-small is-danger'
                                                    : 'mb-2 button is-rounded is-small'
                                            }
                                    >
                                        <i className={'fas ' + this.state.admin.fa} style={{fontSize: 17}}/>
                                        <span className='ml-2 md-display-none'>{this.state.admin.text}</span>
                                    </MenuItem>
                                }
                                {arr.map(element => (
                                    <MenuItem
                                        key={element.id}
                                        component={Link}
                                        to={element.to}
                                        color='primary'
                                        className=
                                            {
                                                context.state.sectionNo === element.id
                                                    ? 'mb-2 button is-rounded is-small is-danger'
                                                    : 'mb-2 button is-rounded is-small'
                                            }
                                    >
                                        <i className={'fas ' + element.fa} style={{fontSize: 17}}/>
                                        <span className='ml-2 md-display-none'>{element.text}</span>
                                    </MenuItem>
                                ))}

                                <button
                                    onClick={() => context.handleShowNewChallengeModal(true)}
                                    className='button is-rounded is-small is-outlined is-danger is-fullwidth'
                                >
                                    <i className='mr-1 fa fa-paper-plane' style={{fontSize: 17}}/>
                                    <span className='ml-2 md-display-none'>Post</span>
                                </button>
                            </MenuList>
                        </div>
                        <ChallengeAdd
                            public
                            show={context.state.showNewChallengeModal}
                            onNewChallenge={context.handleNewChallenge}
                            onHide={context.handleShowNewChallengeModal}
                        />
                    </>
                )}
            </MyContext.Consumer>
        );
    }
}

export default SideBar;