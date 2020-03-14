import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
    MenuList,
    Typography,
    MenuItem
} from "@material-ui/core";

class SideBar extends Component {
    state = {
        arr: [
            {id: 1, to: '/home', fa: 'fa-home', text: 'Home'},
            {id: 2, to: '/dn', fa: 'fa-envelope', text: 'Direct neurons'},
            {id: 3, to: '/profile', fa: 'fa-user', text: 'Profile'},
            {id: 4, to: '/sign-out', fa: 'fa-sign-out', text: 'Sign out'}
        ],
        clicked: this.props.id
    };

    handleClick = id => {
        this.setState({clicked: id})
    };

    render() {
        const {arr, clicked} = this.state;

        return (
            <div className={this.props.className}>
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

                    {arr.map(element => (
                        <MenuItem
                            key={element.id}
                            component={Link}
                            to={element.to}
                            color='primary'
                            className={clicked === element.id ? 'mb-2 button is-rounded is-danger' : 'mb-2 button is-rounded'}
                            onClick={() => this.handleClick(element.id)}
                        >
                            <i className={'fa ' + element.fa} style={{fontSize: 23}}/>
                            <span className='ml-2 md-display-none'>{element.text}</span>
                        </MenuItem>
                    ))}

                    <button className='button is-rounded is-outlined is-danger is-fullwidth'>
                        <i className='mr-1 fa fa-paper-plane' style={{fontSize: 23}}/>
                        <span className='ml-2 md-display-none'>Post</span>
                    </button>
                </MenuList>
            </div>
        );
    }
}

export default SideBar;