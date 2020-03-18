import React, {Component} from 'react';

import {MyContext} from "../Context/ContextProvider";

class Private extends Component {
    static contextType = MyContext;

    componentDidMount() {
        this.context.handleSectionNoChange(1);
    }

    render() {
        return (
            <div>
                private
            </div>
        );
    }
}

export default Private;