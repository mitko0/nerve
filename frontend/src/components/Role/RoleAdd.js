import React, {useState} from 'react';
import {TextField} from "@material-ui/core";

import ButtonLoad from "../CustomInput/ButtonLoad";

import RoleService from "../../repository/axiosRoleRepository";
import {Col, Row} from "react-bootstrap";

const RoleAdd = () => {
    const [loading, setLoading] = useState(false);

    const handleRoleCreate = e => {
        e.preventDefault();

        setLoading(true);
        RoleService.newRole(e.target.role.value)
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
        e.target.reset()
    };

    return (
        <>
            <form onSubmit={handleRoleCreate}>
                <Row>
                    <Col xs={9}>
                        <TextField
                            id="role"
                            name="role"
                            label="Role name"
                            fullWidth
                            margin='dense'
                            color='secondary'
                        />
                    </Col>
                    <Col xs={3}>
                        <ButtonLoad
                            loading={loading}
                            type='submit'
                            className='mr-3'
                            fullWidth
                            color='secondary'
                            variant='outlined'
                            text='Create'
                        />
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default RoleAdd;