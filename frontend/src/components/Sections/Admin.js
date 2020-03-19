import React, {Component} from 'react';
import {TextField} from "@material-ui/core";

import {MyContext} from "../Context/ContextProvider";
import InputError from "../CustomInput/InputError";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import InputSearch from "../CustomInput/InputSearch";

class Admin extends Component {
    static contextType = MyContext;

    state = {
        role: ''
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value})
    };

    componentDidMount() {
        this.context.handleSectionNoChange(4);
    }

    render() {
        const {role} = this.state;

        return (
            <>
                <h2 className='text-info font-italic'>Admin tools</h2>
                <div>
                    <InputSearch
                        image
                        data={new Map()}
                        onSelect={() => console.log('select')}
                        onRemove={() => console.log('remove')}
                    />
                </div>
            </>
        );
    }
}

export default Admin;