import React from "react";
import {Row, Col} from "react-bootstrap";
import {Card} from "@material-ui/core";

import SideBar from "../Navbar/SideBar";
import FeaturedNew from "../Featured/FeaturedNew";

const Skeleton = props => {
    return (
        <>
            <Row className={'mt-2 ml-0 mr-0 ' + props.className}>
                <Col
                    xs={2}
                    sm={3}
                    id="left"
                    className='d-flex justify-content-end'
                >
                    <SideBar
                        id={props.id}
                        className='position-fixed overflow-auto'
                    />
                </Col>
                <Col
                    xs={10}
                    sm={9}
                    lg={6}
                    id="center"
                    style={{height: '99vh'}}
                >
                    {props.children}
                </Col>
                <Col
                    xs={12}
                    lg={3} id="right"
                >
                    <Card
                        raised
                        className='position-fixed mr-3 p-3'
                    >
                        <h3 className='text-danger is-italic'>Latest neurons added</h3>
                        <hr/>
                        <FeaturedNew className='w-100'/>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Skeleton;