import React, {Component} from 'react';
import bcrypt from 'bcryptjs';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {
    TextField,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton
} from "@material-ui/core";

import {MyContext} from "../Context/ContextProvider";
import ImageModal from "../Modal/ImageModal";
import InputError from "../CustomInput/InputError";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ButtonLoad from "../CustomInput/ButtonLoad";

import LSService from "../../repository/localStorage";
import UserService from "../../repository/axiosUserRepository";

class Profile extends Component {
    user = LSService.getItem('user');
    static contextType = MyContext;
    state = {
        error: '',
        finishAsync: true,
        src: null,
        imageFile: null,
        showFullImage: false,
        showSave: false,
        username: this.user.username,
        email: this.user.email || '',
        oldPassword: '',
        password: '',
        confirmPassword: '',
        showOldPassword: false,
        showPassword: false,
        showConfirmPassword: false,
        usernameError: false,
        emailError: false,
        oldPasswordError: false,
        passwordError: false,
    };

    handleViewImage = val => {
        this.setState({showFullImage: val});
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value})
    };

    handleClickShowPassword = prop => () => {
        this.setState({[prop]: !this.state[prop]})
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleImageChange = e => {
        this.setState({showSave: true, imageFile: e.target.files[0]});
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
            this.setState({src: e.target.result});
        };
    };

    handleImageUpdate = () => {
        const p = {
            id: this.user.id,
            pic: this.state.imageFile
        };
        UserService.updateProfilePic(p).then(({data}) => {
            console.log(data);
            LSService.setItem('user', data);
            this.setState({showSave: false});
        });
    };

    validate = (value, regex) => e => {
        this.setState({ [e.target.name + 'Error']: !value.match(regex)});
    };

    validatePassword = () => {
        bcrypt.compare(this.state.oldPassword, this.user.password).then(res => {
            this.setState({oldPasswordError: !res});
        });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        const {oldPassword, username, email, password} = this.state;

        this.setState({finishAsync: false});
        UserService.updateUser(oldPassword, this.user.id, null, username, email, password).then(({data}) => {
            LSService.setItem('user', data.attr1);
            LSService.setItem('jwt', data.attr2);
            this.user = data.attr1;
            this.setState({finishAsync: true, error: '', oldPassword: '', password: '', confirmPassword: ''});
        }).catch(({response, message}) => {
            const err = response ? response.data.toString() : message;
            this.setState({finishAsync: true, error: err, oldPassword: '', password: '', confirmPassword: ''});
        });
    };

    componentDidMount() {
        this.context.handleSectionNoChange(2);
    }

    render() {
        const {finishAsync, username, email, password, oldPassword, confirmPassword} = this.state;
        const {showPassword, showConfirmPassword, showOldPassword} = this.state;
        const {usernameError, emailError, oldPasswordError, passwordError} = this.state;
        const {userValidationMessages, userValidationRegex} = this.context;
        return (
            <>
                <div className='border'>
                    <div className='p-3'>
                        <h2 className='is-bold is-italic'>{this.user.username}</h2>
                        <span className='text-muted'>Neurons gathered: <u>{this.user.points}</u></span>
                    </div>
                    <div
                        id='image-holder'
                        className='bg-gray p-3 position-relative'
                        style={{height: 150}}
                    >
                        <div className='position-absolute' style={{bottom: -65}}>
                            <img
                                src={this.state.src || `data:${this.user.fileDetails.mimeType};base64,${this.user.fileDetails.base64}`}
                                alt={''}
                                className='rounded rounded-circle border-3 cursor-pointer'
                                style={{width: 150, height: 150}}
                                onClick={() => this.handleViewImage(true)}
                            />
                            <label htmlFor="icon-button-file">
                                <i
                                    title='Update profile picture'
                                    className='fa fa-camera text-light ml-1 cursor-pointer'
                                />
                            </label>
                            {
                                this.state.showSave
                                && <button
                                    className='btn btn-link text-light'
                                    onClick={this.handleImageUpdate}
                                >
                                    save
                                </button>
                            }
                            <input
                                id="icon-button-file"
                                name='profile-picture'
                                type='file'
                                accept="image/*"
                                className='display-none'
                                onChange={this.handleImageChange}
                            />
                        </div>
                    </div>
                    <div className='mt-7 p-3'>
                        <form onSubmit={this.handleFormSubmit}>
                            <p className='text-info font-italic'>
                                <i className='fa fa-info-circle mr-2'/>
                                Empty fields will retain the same values!
                            </p>
                            <InputError>
                                <TextField
                                    id="username"
                                    name='username'
                                    label="Username"
                                    fullWidth
                                    className='mb-3'
                                    value={username}
                                    error={usernameError}
                                    inputProps={{tabIndex: "1"}}
                                    onChange={this.handleChange('username')}
                                    onBlur={this.validate(username, userValidationRegex.usernameNR)}
                                />
                                {usernameError && <ErrorMessage title={userValidationMessages.username}/>}
                            </InputError>
                            <InputError>
                                <TextField
                                    id="email"
                                    name='email'
                                    label="Email"
                                    type='email'
                                    fullWidth
                                    className='mb-3'
                                    value={email}
                                    error={emailError}
                                    inputProps={{tabIndex: "2"}}
                                    onChange={this.handleChange('email')}
                                    onBlur={this.validate(email, userValidationRegex.email)}
                                />
                                {emailError && <ErrorMessage title={userValidationMessages.email}/>}
                            </InputError>
                            <InputError>
                                <FormControl fullWidth required>
                                    <InputLabel htmlFor="oldPassword">Old password</InputLabel>
                                    <Input
                                        id="oldPassword"
                                        name='oldPassword'
                                        className='mb-3'
                                        type={showOldPassword ? 'text' : 'password'}
                                        value={oldPassword}
                                        error={oldPasswordError}
                                        inputProps={{tabIndex: "3"}}
                                        onChange={this.handleChange('oldPassword')}
                                        onBlur={this.validatePassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle old password visibility"
                                                    onClick={this.handleClickShowPassword('showOldPassword')}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                >
                                                    {showOldPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {oldPasswordError && <ErrorMessage title='Incorrect password!'/>}
                            </InputError>
                            <InputError>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="password">New password</InputLabel>
                                    <Input
                                        id="password"
                                        name='password'
                                        className='mb-3'
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        error={passwordError}
                                        inputProps={{tabIndex: "4"}}
                                        onChange={this.handleChange('password')}
                                        onBlur={this.validate(password, userValidationRegex.passwordNR)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword('showPassword')}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {passwordError && <ErrorMessage title={userValidationMessages.minLength}/>}
                            </InputError>
                            <InputError>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                                    <Input
                                        id="confirmPassword"
                                        name='confirmPassword'
                                        className='mb-3'
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        error={password !== confirmPassword}
                                        inputProps={{tabIndex: "5"}}
                                        onChange={this.handleChange('confirmPassword')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={this.handleClickShowPassword('showConfirmPassword')}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                >
                                                    {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {password !== confirmPassword && <ErrorMessage title={userValidationMessages.mismatch}/>}
                            </InputError>
                            <div className='d-flex justify-content-end'>
                                <ButtonLoad
                                    type='submit'
                                    className='mr-5'
                                    variant='outlined'
                                    color='secondary'
                                    loading={!finishAsync}
                                    radius={"24px"}
                                    tabIndex={6}
                                    disabled={
                                        !finishAsync
                                        || usernameError
                                        || emailError
                                        || oldPasswordError
                                        || passwordError
                                        || password !== confirmPassword
                                    }
                                >
                                    update
                                </ButtonLoad>
                            </div>
                            <div className='text-danger'>{this.state.error}</div>
                        </form>
                    </div>
                </div>
                <ImageModal
                    src={this.state.src}
                    show={this.state.showFullImage}
                    onHide={() => this.handleViewImage(false)}
                />
            </>
        );
    }
}

export default Profile;