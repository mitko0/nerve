import React, {useEffect} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Rating from "@material-ui/lab/Rating";
import ResponseService from "../../repository/axiosResponseRepository";
import DateFormatter from "../../formatter/dateFormatter";
import ts from "../../repository/localStorage";

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
        height: 255,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
}));

export default function Response(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [state, setState] = React.useState({
        activeStep: 0,
        responses: []
    });

    useEffect(() => {
        loadResponses();
    }, []);

    const handleNext = () => {
        setState({...state, activeStep: state.activeStep + 1});
    };

    const handleBack = () => {
        setState({...state, activeStep: state.activeStep - 1});
    };

    const handleRating = val => {
        let newResponses = state.responses;
        newResponses[state.activeStep].rating = val;
        setState({...state, responses: newResponses});

        const id = {
            senderId: newResponses[state.activeStep].id.senderId,
            receiverId: newResponses[state.activeStep].id.receiverId,
            createDate: DateFormatter.formatIso(newResponses[state.activeStep].id.createDate)
        };
        ResponseService.rateResponse(id, val);
    };

    const loadResponses = () => {
        const id = props.challengeId;
        ResponseService.getResponsesForChallenge(id).then(response => {
            setState({...state, responses: response.data})
        })
    };

    const flag = state.responses.length !== 0;
    const responses = state.responses;

    const name = flag ? responses[state.activeStep].id.createDate.toString() : 'empty';
    const media = () => {
        if (flag) {
            return responses[state.activeStep].fileDetails.mimeType.includes('image') ?
                <img
                    src={flag ? `data:${responses[state.activeStep].fileDetails.mimeType};base64,${responses[state.activeStep].fileDetails.base64}` : ''}
                    className='media'
                    alt={''}/> :
                <video className='media' controls>
                    <source
                        src={flag ? `data:${responses[state.activeStep].fileDetails.mimeType};base64,${responses[state.activeStep].fileDetails.base64}` : ''}/>
                </video>;
        }
    };

    const mobileStepper = flag && state.responses.length > 1? <MobileStepper
        steps={state.responses.length}
        position="static"
        variant='dots'
        activeStep={state.activeStep}
        nextButton={
            <Button size="small" onClick={handleNext}
                    disabled={state.activeStep === state.responses.length - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </Button>
        }
        backButton={
            <Button size="small" onClick={handleBack} disabled={state.activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                Back
            </Button>
        }
    /> : '';

    const body = flag ?
        <div>
            <Paper square elevation={0} className={classes.header}>
                <Rating
                    readOnly={props.owner !== ts.getUsername()}
                    name={name}
                    value={flag ? responses[state.activeStep].rating : 0}
                    onChange={(event, value) => handleRating(value)}
                />
            </Paper>
            <div className='d-flex justify-content-center align-items-center'>
                {media()}
            </div>
            {mobileStepper}
        </div>
        : <div className='p-4 text-muted'>No responses found!</div>;

    return (
        <div className={classes.root}>
            {body}
        </div>
    );
}