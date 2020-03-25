import React, {useState} from 'react';
import {CardActions, IconButton} from "@material-ui/core";
import {
    AddPhotoAlternate,
    Close,
    Publish
} from "@material-ui/icons";

import ResponseService from "../../repository/axiosResponseRepository";
import LSService from "../../repository/localStorage";

const ResponseAdd = props => {
    const [state, setState] = useState({
        file: {},
        showAdd: false,
        disabled: true,
    });

    const handleRespond = () => {
        setState({...state, disabled: true, showAdd: !showAdd, file: {}});
        showAdd && ResponseService.newResponse(
            props.senderId,
            props.receiverId,
            props.challengedDate,
            state.file,
            props.responderId
        ).then(({data}) => {
            const resp = {
                attr1: data,
                attr2: LSService.getItem('user')
            };
            props.onFinish(resp);
        }).catch(err => {
            console.log(err);
        });
    };

    const handleFileSelect = e => {
        Boolean(e.target.files.length) && setState({...state, file: e.target.files[0], disabled: false});
    };

    const {file, showAdd, disabled} = state;
    return (
        <>
            <div>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="respond"
                        onClick={handleRespond}
                        disabled={showAdd && disabled}
                    >
                        {
                            showAdd
                                ? <Publish fontSize='large'/>
                                : <AddPhotoAlternate fontSize='large'/>
                        }
                    </IconButton>
                    {showAdd && <IconButton
                        aria-label="respond"
                        onClick={() => setState({...state, showAdd: false})}
                    >
                        <Close fontSize='large'/>
                    </IconButton>}
                </CardActions>

                <CardActions>
                    {showAdd &&
                    <div className="file has-name">
                        <label className="file-label">
                            <input
                                className="file-input"
                                type="file"
                                name="file"
                                accept='image/*, video/*'
                                onChange={handleFileSelect}
                            />
                            <span className="file-cta">
                        <span className="file-icon">
                            <i className="fa fa-search"/>
                        </span>
                    </span>
                            <span className="file-name">
                        {file.name}
                    </span>
                        </label>
                    </div>}
                </CardActions>
            </div>
        </>

    );
};

export default ResponseAdd;