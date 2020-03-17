import React from "react";
import  {Modal} from 'react-bootstrap';

const SimpleModal = props => {
    return (
        <div>
            <Modal
                size='lg'
                backdropClassName='bg-danger'
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                show={props.open}
                onHide={props.onClose}
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <h2 id="simple-modal-title">
                        {props.title}
                    </h2>
                    <div id="simple-modal-description" className='wrap'>
                        {props.body}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SimpleModal;