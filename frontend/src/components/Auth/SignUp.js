import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {
    TextField,
    makeStyles,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControl,

} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";

import Sign from "./Sign";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import InputError from "../CustomInput/InputError";
import ButtonLoad from "../CustomInput/ButtonLoad";
import {MyContext} from '../Context/ContextProvider';

import UserService from "../../repository/axiosUserRepository";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
}));

const SignUp = () => {
    const context = useContext(MyContext);
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = React.useState({
        error: '',
        finishAsync: true,
        dirty: false,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        usernameError: false,
        emailError: false,
        passwordError: false,
    });

    const handleChange = prop => event => {
        const dirty = Boolean(values.username.length && values.password.length && values.confirmPassword.length);
        setValues({...values, [prop]: event.target.value, dirty: dirty});
    };

    const handleClickShowPassword = val => () => {
        setValues({...values, [val]: !values[val]});
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const validate = (value, regex) => e => {
        setValues({...values, [e.target.name + 'Error']: !value.match(regex)});
    };

    const handleFormSubmit = event => {
        event.preventDefault();

        setValues({...values, finishAsync: false});
        UserService.createUser(username, email, password).then(() => {
            setValues({...values, finishAsync: true});
            history.push("/sign-in");
        }).catch(({response, message}) => {
            const err = response ? response.data.toString() : message;
            setValues({...values, finishAsync: true, error: err});
        });
    };

    const {username, email, password, confirmPassword} = values;
    const {error, usernameError, emailError, passwordError} = values;
    return (
        <Sign
            footer
            title={"Sign Up"}
            description={"Already have an account?"}
            linkText={"Sign In"}
            to={"/sign-in"}
        >
            <form
                className={classes.form}
                onSubmit={handleFormSubmit}
            >
                <InputError>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        required
                        fullWidth
                        autoFocus
                        margin='normal'
                        variant="outlined"
                        error={usernameError}
                        inputProps={{tabIndex: "1"}}
                        onBlur={validate(values.username, context.userValidationRegex.username)}
                        onChange={handleChange('username')}
                    />
                    {usernameError && <ErrorMessage title={context.userValidationMessages.username}/>}
                </InputError>
                <InputError>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        margin='normal'
                        variant="outlined"
                        error={emailError}
                        inputProps={{tabIndex: "2"}}
                        onBlur={validate(values.email, context.userValidationRegex.email)}
                        onChange={handleChange('email')}
                    />
                    {emailError && <ErrorMessage title={context.userValidationMessages.email}/>}
                </InputError>
                <InputError>
                    <FormControl
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name={"password"}
                            value={values.password}
                            type={values.showPassword ? 'text' : 'password'}
                            error={passwordError}
                            inputProps={{tabIndex: "3"}}
                            onChange={handleChange('password')}
                            onBlur={validate(values.password, context.userValidationRegex.password)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword('showPassword')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={80}
                        />
                    </FormControl>
                    {passwordError && <ErrorMessage title={context.userValidationMessages.minLength}/>}
                </InputError>
                <InputError>
                    <FormControl
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    >
                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            name={"confirmPassword"}
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            inputProps={{tabIndex: "4"}}
                            error={password !== confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword('showConfirmPassword')}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={145}
                        />
                    </FormControl>
                    {password !== confirmPassword && <ErrorMessage title={context.userValidationMessages.mismatch}/>}
                </InputError>
                <ButtonLoad
                    type="submit"
                    text={'Sign up'}
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    loading={!values.finishAsync}
                    radius={"24px"}
                    tabIndex={5}
                    disabled={
                        !values.dirty
                        || !values.finishAsync
                        || usernameError
                        || emailError
                        || passwordError
                        || password !== confirmPassword
                    }
                />
                <div className='text-danger'>{error}</div>
            </form>
        </Sign>
    );
};
export default SignUp;