import React, {Component} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from "@material-ui/core/Modal";

class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClick = () => {
        this.setState({open: true})
    };

    onClose = () => {
        this.setState({open: false})
    };

    showMore = () => {
        const details = document.getElementById("details");
        const challenge = document.getElementById("challenge");
        
        const detailsW = parseFloat(window.getComputedStyle(details, null).getPropertyValue("width"));
        const detailsPL = parseFloat(window.getComputedStyle(details, null).getPropertyValue("padding-left"));
        const detailsPR = parseFloat(window.getComputedStyle(details, null).getPropertyValue("padding-right"));

        const challengeW = parseFloat(window.getComputedStyle(challenge, null).getPropertyValue("width"));
        const challengePL = parseFloat(window.getComputedStyle(challenge, null).getPropertyValue("padding-left"));
        const challengePR = parseFloat(window.getComputedStyle(challenge, null).getPropertyValue("padding-right"));

        const v1 = Math.round((challengeW - challengePL - challengePR) * 0.91);
        const v2 = Math.round(detailsW - detailsPL - detailsPR);

        return v1 === v2;
    };

    componentDidMount() {
        document.getElementById("more").style.display = this.showMore()? "inline-block" : "none";
    }

    render() {
        return (
            <div className='challenge' id="challenge">
                <div className='details' id="details">
                    {this.props.description}
                </div>
                <button type="button" id="more" className='btn btn-link' onClick={this.handleClick}>
                    <span className='text-muted'>more</span>
                </button>
                <SimpleModal open={this.state.open}
                             onClose={this.onClose}
                             text={this.props.description}/>
            </div>
        )
    }
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

function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open ? props.open : false}
                onClose={props.onClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Text in a modal</h2>
                    <p id="simple-modal-description" className='wrap'>
                        {props.text}
                    </p>
                    <SimpleModal/>
                </div>
            </Modal>
        </div>
    );
}

export default Challenge;