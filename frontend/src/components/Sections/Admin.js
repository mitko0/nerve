import React, {Component} from 'react';
import differenceBy from 'lodash/differenceBy';

import {MyContext} from "../Context/ContextProvider";
import RolePromote from "../Role/RolePromote";
import RoleAdd from "../Role/RoleAdd";

import UserService from "../../repository/axiosUserRepository";
import RoleService from "../../repository/axiosRoleRepository";
import LSService from "../../repository/localStorage";

class Admin extends Component {
    static contextType = MyContext;
    user = LSService.getItem('user');
    state = {
        showModal: false,
        finishAsync: true,
        role: this.user.role,
        data: [],
        selectedRows: [],
        toggleCleared: false,
        selectedUsers: new Map(),
    };

    handleRowChange = state => {
        this.setState({selectedRows: state.selectedRows});
    };

    deleteAll = () => {
        let ids = this.state.selectedRows.map(obj => obj.id);
        if (window.confirm('Confirm delete!')) {
            this.setState(state => ({
                toggleCleared: !state.toggleCleared,
                data: differenceBy(state.data, state.selectedRows, 'id')
            }));
            UserService.deleteAll(ids).then();
        }
    };

    handleSelectRole = item => {
        this.setState({
            toggleCleared: !this.state.toggleCleared,
            data: [],
            role: item
        });
        RoleService.usersWithRole(item.roleName).then(({data}) => {
            this.setState({data: data});
        });
    };

    handleShowModal = () => {
        this.setState({showModal: true});
    };

    handleHideModal = () => {
        this.setState({showModal: false});
    };

    handleUsersPromote = () => {
        let {selectedUsers, data, role} = this.state;
        let ids = [...selectedUsers.keys()];
        this.setState({finishAsync: false});
        RoleService.promoteUsers(role.id, ids).then(result => {
            const dif = differenceBy(result.data, data, 'id');
            data = data.concat(dif);
            this.setState({finishAsync: true, data: data, selectedUsers: new Map()});
        });
        this.setState({finishAsync: true, showModal: false});
    };

    handleSelectUser = user => {
        const {selectedUsers} = this.state;
        selectedUsers.set(user.id, user);
        this.setState({users: selectedUsers});
    };

    handleRemoveUser = key => {
        const {selectedUsers} = this.state;
        selectedUsers.delete(key);
        this.setState({users: selectedUsers});
    };

    handleDeleteRole = () => {
        if (window.confirm('Confirm delete!')) {
            let ids = this.state.data.map(obj => obj.id);
            RoleService.promoteUsers(0, ids).then();

            this.setState(state => ({
                toggleCleared: !state.toggleCleared,
                role: null,
                data: []
            }));
            RoleService.deleteRole(this.state.role.id).then();
        }
    };

    componentDidMount() {
        this.context.handleSectionNoChange(4);
        RoleService.usersWithRole(this.state.role.roleName).then(({data}) => {
            this.setState({data: data});
        });
    }

    render() {
        const {finishAsync, role, showModal, selectedUsers} = this.state;
        const {data, toggleCleared} = this.state;
        return (
            <>
                <h2 className='is-italic has-text-danger'>Admin tools</h2>
                <div>
                    <p className='is-italic has-text-danger'>Create role</p>
                    <RoleAdd/>
                    <hr/>
                    <p className='is-italic has-text-danger'>Manipulate users' roles</p>
                    <RolePromote
                        data={data}
                        role={role}
                        toggleCreated={toggleCleared}
                        finishAsync={finishAsync}
                        showModal={showModal}
                        selectedUsers={selectedUsers}
                        handleShowModal={this.handleShowModal}
                        handleSelectRole={this.handleSelectRole}
                        deleteAll={this.deleteAll}
                        handleRowChange={this.handleRowChange}
                        handleRemoveUser={this.handleRemoveUser}
                        handleSelectUser={this.handleSelectUser}
                        handleUsersPromote={this.handleUsersPromote}
                        handleHideModal={this.handleHideModal}
                        handleDeleteRole={this.handleDeleteRole}
                    />
                </div>
            </>
        );
    }
}

export default Admin;