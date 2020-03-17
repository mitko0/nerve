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

class InputSearch extends Component {
    state = {
        results: [],
        value: '',
    };

    handleChange = async e => {
        let res = [],
            value = e.target.value;
        value.trim().length !== 0 && await UserService.searchUsers(value).then(({data}) => {
            res = data;
        });

        this.setState({results: res, value: value})
    };

    handleSelect = user => {
        console.log(this.props.data);
        this.props.onSelect(user);
        this.setState({results: [], value: ''});
    };

    handleRemove = key => {
        this.props.onRemove(key);
        this.setState({results: [], value: ''});
    };

    render() {
        return (
            <>
                <div className='bg-light mb-2 p-3 is-rounded'>
                    <FormControl fullWidth>
                        <Input
                            value={this.state.value}
                            onChange={this.handleChange}
                            placeholder='Search...'
                            id="input-with-icon-adornment"
                            autoFocus
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <PillList
                        data={this.props.data}
                        onClick={this.handleRemove}
                    />
                </div>
                <SearchResult
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
        <div className='search-result mb-4 bg-light p-2'>
            {props.results.map(user => (
                <Media
                    className='cursor-pointer'
                    key={user.id}
                    user={user}
                    onClick={() => props.onSelect(user)}
                >
                    <Avatar
                        style={{width: '30px', height: '30px'}}
                        className='border border-danger mr-2'
                        src={`data:${user.fileDetails.mimeType};base64,${user.fileDetails.base64}`}
                    >R</Avatar>
                    <Media.Body className='control'>
                        {user.username}
                    </Media.Body>
                </Media>
            ))}
        </div>
    );
};

const PillList = props => {
    return (
        <div className='mt-3'>
            {[...props.data.values()].map(user => (
                <Badge
                    key={user.id}
                    pill
                    variant="info"
                    className='mr-2 border'
                >
                    <Media
                        className='cursor-pointer'
                        user={user}
                        onClick={() => props.onClick(user.id)}
                    >
                        <Avatar
                            style={{width: '15px', height: '15px'}}
                            className='border border-danger mr-2'
                            src={`data:${user.fileDetails.mimeType};base64,${user.fileDetails.base64}`}
                        >R</Avatar>
                        <Media.Body className='control'>
                            {user.username}
                            <span className='fa fa-close ml-2'/>
                        </Media.Body>
                    </Media>
                </Badge>
            ))}
        </div>
    );
};