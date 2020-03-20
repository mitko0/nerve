import React, {Component} from 'react';
import {
    Avatar,
    FormControl,
    Input,
    InputAdornment,
} from "@material-ui/core";
import {
    Badge,
    Media
} from "react-bootstrap";
import {Search} from "@material-ui/icons";

import UserService from "../../repository/axiosUserRepository";
import RoleService from "../../repository/axiosRoleRepository";
import LSService from "../../repository/localStorage";

/*
* props:
*   filterCurrent - remove current user, boolean
*   data - selected items, Map
*   type - search target, string: users(default), roles
*   image - show Avatar, boolean
*   onSelect - what happens on item click, CB
*   onRemove - what happens on item remove, CB
* */

class InputSearch extends Component {
    state = {
        results: [],
        value: '',
    };

    handleChange = e => {
        let value = e.target.value;
        this.setState({value: value});
        !value.trim().length && this.setState({results: []});

        (!this.props.type || this.props.type === 'users')
        && value.trim().length && UserService.searchUsers(value).then(({data}) => {
            this.props.filterCurrent && (data = data.filter(curr => (
                curr.id !== LSService.getItem('user').id
            )));
            this.setState({results: data});
        });

        this.props.type === 'roles'
        && value.trim().length && RoleService.search(value).then(({data}) => {
            this.setState({results: data});
        });
    };

    handleSelect = item => {
        this.props.onSelect && this.props.onSelect(item);
        this.setState({results: [], value: ''});
    };

    handleRemove = key => {
        this.props.onRemove && this.props.onRemove(key);
        this.setState({results: [], value: ''});
    };

    render() {
        return (
            <>
                <div className='bg-light mb-1 p-3 is-rounded'>
                    <FormControl fullWidth>
                        <Input
                            color='secondary'
                            autoComplete='off'
                            value={this.state.value}
                            onChange={this.handleChange}
                            placeholder='Search...'
                            id="input-with-icon-adornment"
                            autoFocus
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search color='secondary'/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {
                        this.props.data
                        && <PillList
                            image={this.props.image}
                            roles={this.props.roles}
                            data={this.props.data}
                            onClick={this.handleRemove}
                        />
                    }
                </div>
                <SearchResult
                    type={this.props.type}
                    image={this.props.image}
                    roles={this.props.roles}
                    results={this.state.results}
                    onSelect={this.handleSelect}
                />
            </>
        );
    }
}

export default InputSearch;


const SearchResult = props => {
    return (
        <>
            <div className='position-relative' style={{zIndex: 200}}>
                <div className='search-result mb-4 bg-light position-absolute w-100'>
                    {props.results.map(item => (
                        <Media
                            className='cursor-pointer p-2'
                            key={item.id}
                            item={item}
                            onClick={() => props.onSelect(item)}
                        >
                            {
                                props.image
                                && <Avatar
                                    style={{width: '30px', height: '30px'}}
                                    className='border border-danger mr-2'
                                    src={`data:${item.fileDetails.mimeType};base64,${item.fileDetails.base64}`}
                                >R</Avatar>
                            }
                            <Media.Body className='control'>
                                {(!props.type || props.type === 'users') && item.username}
                                {props.type === 'roles' && item.roleName}
                            </Media.Body>
                        </Media>
                    ))}
                </div>
            </div>
        </>
    );
};

const PillList = props => {
    return (
        <div className='mt-3'>
            {[...props.data.values()].map(item => (
                <Badge
                    key={item.id}
                    pill
                    variant="info"
                    className='mr-2 border'
                >
                    <Media
                        className='cursor-pointer'
                        item={item}
                        onClick={() => props.onClick(item.id)}
                    >
                        {
                            props.image
                            && <Avatar
                                style={{width: '15px', height: '15px'}}
                                className='border border-danger mr-2'
                                src={`data:${item.fileDetails.mimeType};base64,${item.fileDetails.base64}`}
                            >R</Avatar>
                        }
                        <Media.Body className='control'>
                            {props.roles
                                ? item.roleName
                                : item.username}
                            <span className='fa fa-close ml-2'/>
                        </Media.Body>
                    </Media>
                </Badge>
            ))}
        </div>
    );
};