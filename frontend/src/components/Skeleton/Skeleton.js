import React, {Component} from "react";
import Post from "../Post/Post";

class Skeleton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='row mt-5'>
                <div className='col-md-3 order-sm-1 order-md-0' id='left'>
                    {this.props.left}
                </div>

                <div className='col-md-6 order-sm-0 order-md-1 d-flex justify-content-center' id='center'>
                    {/*{this.props.center}*/}
                    <Post/>
                </div>

                <div className='col-md-3 order-sm-2' id='right'>
                    {this.props.right}
                </div>
            </div>
        );
    }
}

export default Skeleton;