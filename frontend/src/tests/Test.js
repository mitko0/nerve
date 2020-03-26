import React, {Component, Fragment} from "react";
import GlobalService from "../repository/GlobalService";
import {MyContext} from "../components/Context/ContextProvider";

class Test extends Component {
    static contextType = MyContext;

    componentDidMount() {
        const obj1 = {
            id: {
                senderId: 1,
                receiverId: 2
            },
            description: 'asd'
        };

        const obj2 = {
            id: {
                senderId: 1,
                receiverId: 2
            },
            description: 'asd'
        };
        console.log(GlobalService.checkEqual(obj1, obj2, obj=>obj));
    }


    render() {
        return (
            <Fragment>

            </Fragment>
        );
    };
}

export default Test;