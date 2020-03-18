import React from "react";
import {Modal} from "react-bootstrap";

import LSService from "../../repository/localStorage";

const ImageModal = props => {
    const user = LSService.getItem('user');
    return (
        <Modal
            centered
            backdropClassName='bg-danger'
            size="lg"
            show={props.show}
            onHide={props.onHide}
        >
            <img
                src={props.src || `data:${user.fileDetails.mimeType};base64,${user.fileDetails.base64}`}
                alt={''}
                style={{width: '100%', height: '100%'}}
            />
        </Modal>
    );
};

export default ImageModal;