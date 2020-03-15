import React, {Component} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

class Challenge2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showMore: false
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
        this.setState({open: this.showMore()})
        //document.getElementById("more").style.display = this.showMore()? "inline-block" : "none";
    }

    render() {
        return (
            <div className='challenge' id="challenge">
                <div className='details' id="details">
                    {this.props.description}
                </div>
                <button type="button" id="more"
                        className='btn btn-link'
                        onClick={this.handleClick}
                        style={{display: this.state.showMore ? 'inline-block' : 'none'}}>
                    <span className='text-muted'>more</span>
                </button>

            </div>
        )
    }
}

export default Challenge2;