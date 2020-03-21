import React, {Component} from 'react';
import UserService from "../../repository/axiosUserRepository";
import {Avatar} from "@material-ui/core";
import {Media} from "react-bootstrap";

class FeaturedNew extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        UserService.getAllUsers().then(({data}) => {
            this.setState({users: data.content})
        })
    }

    render() {
        const {users} = this.state;
        return (
            <>
                <div
                    id='root'
                    className={this.props.className}
                >
                    {users.map((item) => {
                        return <Media
                            key={item.id}
                        >
                            {
                                <Avatar
                                    style={{width: '30px', height: '30px'}}
                                    className='border border-danger mr-2'
                                    src={`data:${item.fileDetails.mimeType};base64,${item.fileDetails.base64}`}
                                >R</Avatar>
                            }
                            <Media.Body className='control'>
                                {item.username}
                            </Media.Body>
                        </Media>
                    })}
                </div>
            </>
        );
    }
}

export default FeaturedNew;