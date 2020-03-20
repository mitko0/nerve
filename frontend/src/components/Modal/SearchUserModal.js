import React from 'react';
import {Modal} from "react-bootstrap";
import InputSearch from "../CustomInput/InputSearch";
import ButtonLoad from "../CustomInput/ButtonLoad";

/*
* data - Map()
* show - bool
* loading - bool
* handleHideModal - CB
* onRemove - CB
* onSelect - CB
* onSubmit - CB
* */

const SearchUserModal = props => {
    return (
        <>
            <Modal
                size={"lg"}
                backdropClassName='bg-danger'
                show={props.show}
                onHide={props.onHide}
            >
                <Modal.Header closeButton >
                    <Modal.Title>Promote users to: {props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{height: 280}} className='d-flex flex-column justify-content-between'>
                        <>
                            <InputSearch
                                image
                                filterCurrent
                                data={props.data}
                                onSelect={props.onSelect}
                                onRemove={props.onRemove}
                            />
                        </>
                        <ButtonLoad
                            className='mt-auto'
                            disabled={props.loading}
                            loading={props.loading}
                            variant='outlined'
                            color='secondary'
                            text='Promote'
                            onClick={props.onSubmit}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SearchUserModal;