import React from 'react';
import memoize from 'memoize-one';
import DataTable from "react-data-table-component";
import {Add, ArrowDownward, Delete} from "@material-ui/icons";
import {
    IconButton,
    Checkbox,
} from "@material-ui/core";

import InputSearch from "../CustomInput/InputSearch";
import SearchUserModal from "../Modal/SearchUserModal";

import LSService from "../../repository/localStorage";

/*
* data
* role
* toggleCleared
* finishAsync
* showModal
*
* selectedUsers
*
* handleShowModal
* handleSelectRole
* deleteAll
* handleRowChange
* handleRemoveUser
* handleSelectUser
* handleUsersPromote
* handleHideModal
*
*/

const sortIcon = <ArrowDownward/>;
const selectProps = {indeterminate: isIndeterminate => isIndeterminate};
const actions = memoize((clickHandler1, clickHandler2, disabled) => (
    <>
        <IconButton
            title='Promote user'
            color="secondary"
            onClick={clickHandler1}
        >
            <Add/>
        </IconButton>
        <IconButton
            disabled={disabled}
            title='Delete role'
            color="secondary"
            onClick={clickHandler2}
        >
            <Delete/>
        </IconButton>
    </>
));
const contextActions = memoize(deleteHandler => (
    <IconButton
        color="secondary"
        onClick={deleteHandler}
    >
        <Delete/>
    </IconButton>
));

const columns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Username',
        selector: 'username',
        sortable: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'Points',
        selector: 'points',
        sortable: true,
    }
];

const RolePromote = props => {
    const currentUser = LSService.getItem('user');
    const disabled = !props.role || props.role.id === currentUser.role.id;
    return (
        <>
            <InputSearch
                type='roles'
                onSelect={props.handleSelectRole}
            />
            {
                (props.data.length !== 0 || props.role)
                && <>
                    <DataTable
                        title={"Users with role: " + props.role.roleName}
                        columns={columns}
                        data={props.data}
                        selectableRows
                        highlightOnHover
                        defaultSortField="id"
                        actions={actions(props.handleShowModal, props.handleDeleteRole, disabled)}
                        contextActions={contextActions(props.deleteAll)}
                        sortIcon={sortIcon}
                        selectableRowsComponent={Checkbox}
                        selectableRowsComponentProps={selectProps}
                        onSelectedRowsChange={props.handleRowChange}
                        clearSelectedRows={props.toggleCleared}
                        pagination
                        selectableRowDisabled={val => val.id === currentUser.id}
                    />
                    <SearchUserModal
                        title={props.role.roleName}
                        data={props.selectedUsers}
                        show={props.showModal}
                        loading={!props.finishAsync}
                        onHide={props.handleHideModal}
                        onSubmit={props.handleUsersPromote}
                        onSelect={props.handleSelectUser}
                        onRemove={props.handleRemoveUser}
                    />
                </>
            }
        </>
    );

};

export default RolePromote;