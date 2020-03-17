import React from "react";
import {Row, Col} from "react-bootstrap";
import {Card} from "@material-ui/core";

import SideBar from "../Navbar/SideBar";

const Skeleton = props => {
    return (
        <Row className={'mt-2 ml-0 mr-0 ' + props.className}>
            <Col
                xs={2}
                sm={3}
                id="left"
                className='d-flex justify-content-end'
            >
                <SideBar
                    id={props.id}
                    className='position-fixed'
                />
            </Col>
            <Col
                xs={10}
                sm={9}
                lg={6}
                id="center"
                style={{height: '98vh'}}
            >
                {props.children}
            </Col>
            <Col
                xs={12}
                lg={3} id="right"
            >
                <Card
                    raised
                    className='position-fixed mr-3'
                >
                    oscce ce si se sera f nego
                </Card>
            </Col>
        </Row>
    );
};

export default Skeleton;