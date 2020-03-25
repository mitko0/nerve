import React, {useEffect, useState} from 'react';
import {
    KeyboardArrowLeft,
    KeyboardArrowRight,
    DeleteForever,
} from '@material-ui/icons';
import {
    useTheme,
    makeStyles,
    MobileStepper,
    Paper,
    Button,
    Avatar,
    IconButton,
} from '@material-ui/core';
import {
    Media,
    Modal,
} from "react-bootstrap";
import {Rating} from "@material-ui/lab";

import ResponseAdd from "./ResponseAdd";

import ResponseService from "../../repository/axiosResponseRepository";
import DateFormatter from "../../formatter/DateFormatter";
import LSService from "../../repository/localStorage";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        overflow: 'hidden',
        display: 'block',
        border: '1px solid red',
        marginTop: '7px',
    },
}));

const Response = props => {
    const classes = useStyles();
    const theme = useTheme();

    const [state, setState] = useState({
        responses: [],
        activeStep: 0,
        showModal: false,
    });

    useEffect(() => {
        loadResponses();
    }, []);

    const handleNext = () => {
        setState({...state, activeStep: activeStep + 1});
    };

    const handleBack = () => {
        setState({...state, activeStep: activeStep - 1});
    };

    const handleRating = val => {
        const {responses, activeStep} = state;

        responses[activeStep].attr1.rating = val;
        setState({...state, responses: responses});

        const id = {
            senderId: responses[activeStep].attr1.id.senderId,
            receiverId: responses[activeStep].attr1.id.receiverId,
            createDate: DateFormatter.formatIso(responses[activeStep].attr1.id.createDate)
        };
        ResponseService.rateResponse(id, val).then(() => {})
    };

    const loadResponses = () => {
        const id = props.challenge.id;
        ResponseService.getResponsesForChallengeWithUser(id.senderId, id.receiverId, id.createDate).then(({data}) => {
            setState({...state, responses: data});
        });
    };

    const handleDelete = () => {
        const id = responses[activeStep].attr1.id;
        ResponseService.deleteResponse(id.senderId, id.receiverId, id.createDate).then(() => {});

        responses.splice(activeStep, 1);
        let as = activeStep !== 0 ? activeStep - 1 : 0;
        setState({...state, responses: responses, activeStep: as, showModal: false})
    };

    const handleAddFinish = (response) => {
        responses.unshift(response);
        setState({...state, responses: responses, activeStep: 0});
    };

    const flag = state.responses.length !== 0;
    const {responses, activeStep, showModal} = state;
    return (
        <div className=''>
            {
                flag && <Media>
                    <Media.Body>
                        <Media className='ml-5 mr-3'>
                            <Avatar
                                className={classes.img}
                                src={`data:${responses[activeStep].attr2.fileDetails.mimeType};base64,${responses[activeStep].attr2.fileDetails.base64}`}
                                title={responses[activeStep].attr2.username}
                            >
                                R
                            </Avatar>
                            <Media.Body>
                                <div className={classes.root}>
                                    <div>
                                        <Paper
                                            square
                                            elevation={0}
                                            className={classes.header}
                                        >
                                            <Rating
                                                readOnly={props.owner !== LSService.getUsername()}
                                                name={props.id.toString() + responses[activeStep].attr1.id.createDate.toString()}
                                                value={flag ? responses[activeStep].attr1.rating : 0}
                                                onChange={(event, value) => handleRating(value)}
                                            />
                                            {
                                                (
                                                    props.owner === LSService.getUsername()
                                                    || responses[activeStep].attr2.username === LSService.getUsername()
                                                )
                                                && <IconButton
                                                    aria-label="respond"
                                                    className='ml-auto'
                                                    onClick={() => setState({...state, showModal: true})}
                                                >
                                                    <DeleteForever fontSize='large' color='secondary'/>
                                                </IconButton>
                                            }
                                        </Paper>
                                        <div
                                            className='d-flex justify-content-center align-items-center media-holder'>
                                            {
                                                flag && responses[activeStep].attr1.fileDetails.mimeType.includes('image') ?
                                                    <img
                                                        src={`data:${responses[activeStep].attr1.fileDetails.mimeType};base64,${responses[activeStep].attr1.fileDetails.base64}`}
                                                        className='m-media'
                                                        alt={''}
                                                    />
                                                    : <video
                                                        controls
                                                        className='m-media'
                                                    >
                                                        <source
                                                            src={flag && `data:${responses[activeStep].attr1.fileDetails.mimeType};base64,${responses[activeStep].attr1.fileDetails.base64}`}
                                                        />
                                                    </video>
                                            }
                                        </div>
                                        {
                                            responses.length > 1 &&
                                            <MobileStepper
                                                steps={responses.length}
                                                position="static"
                                                variant='progress'
                                                activeStep={activeStep}
                                                nextButton={
                                                    <Button
                                                        size="small"
                                                        onClick={handleNext}
                                                        disabled={activeStep === responses.length - 1}
                                                    >
                                                        Next
                                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> :
                                                            <KeyboardArrowRight/>}
                                                    </Button>
                                                }
                                                backButton={
                                                    <Button
                                                        size="small"
                                                        onClick={handleBack}
                                                        disabled={activeStep === 0}
                                                    >
                                                        {theme.direction === 'rtl' ? <KeyboardArrowRight/> :
                                                            <KeyboardArrowLeft/>}
                                                        Back
                                                    </Button>
                                                }
                                            />
                                        }
                                    </div>
                                </div>
                            </Media.Body>
                        </Media>
                    </Media.Body>

                    <Modal
                        backdropClassName='bg-danger'
                        size='sm'
                        show={showModal}
                        onHide={() => setState({...state, showModal: false})}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Conformation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this item ?!</Modal.Body>
                        <Modal.Footer>
                            <Button
                                color='secondary'
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                color='primary'
                                onClick={() => setState({...state, showModal: false})}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Media>
            }
            {(props.challenge.id.receiverId === -1
                || responses.length === 0)
                && <ResponseAdd
                senderId={props.challenge.id.receiverId}
                receiverId={props.challenge.id.senderId}
                challengedDate={props.challenge.id.createDate}
                responderId={LSService.getItem('user').id}
                onFinish={handleAddFinish}
            />}
        </div>
    )
};

export default Response;