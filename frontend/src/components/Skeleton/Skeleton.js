import React, {Component} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Card} from "@material-ui/core";

class Skeleton extends Component {

    render() {
        return (
            <Container>
                <Row className='mt-7'>
                    <Col xs={12} md={8} id="left">
                        {this.props.children}
                    </Col>

                    <Col xs={12} md={4} id="right">
                        <Card raised className='position-fixed p-3'>
                            ega se sera f nego xd
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Skeleton;