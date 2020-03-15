import React, {useState} from "react";
import {Modal, makeStyles} from "@material-ui/core";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const SimpleModal = props => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open}
                onClose={props.onClose}
            >
                <div
                    style={modalStyle}
                    className={classes.paper}
                >
                    <h2 id="simple-modal-title">
                        {props.title}
                    </h2>
                    <div id="simple-modal-description" className='wrap'>
                        {props.body}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SimpleModal;