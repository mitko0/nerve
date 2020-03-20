import React, {Component} from "react";
import {ContextProvider} from "../components/Context/ContextProvider";

class Test extends Component {
    render() {
        return (
            <ContextProvider>
            </ContextProvider>
        );
    };
}

export default Test;