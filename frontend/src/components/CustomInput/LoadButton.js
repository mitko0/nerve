import React, {Component} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

class LoadButton extends Component {
    render() {
        return (
            <Button
                disabled={this.props.disabled}
                type={this.props.type}
                fullWidth={this.props.fullWidth}
                variant={this.props.variant}
                color={this.props.color}
                className={this.props.className}
                tabIndex={this.props.tabIndex}
            >
                {this.props.loading ?
                    <span>{this.props.text}</span> :
                    <CircularProgress size={this.props.radius}/>}
            </Button>
        );
    }
}

export default LoadButton;