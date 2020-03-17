import React from 'react';
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

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        finishAsync: true,
        usernameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false
    });

   /* const regex = {
        username: /^[a-zA-Z0-9!.=_]{4,}$/,
        email: /(^(?![\s\S])|(^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$))/,
        password: /.{4,}/
    };*/

    const messages = {
        username: "Username needs to be at least 4 characters long and can contain only numbers, letters and ! . = _",
        minLength: "Minimum length is 4",
        email: "Invalid email",
        mismatch: "Fields do not have equal values"
    };

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = val => () => {
        setValues({...values, [val]: !values[val]});
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

  /*  const validate = (value = '', regex = /.{4,}/) => e => {
        setValues({...values, [e.target.name + 'Error']: !value.match(regex)});
    };

    const passwordCheck = e => {
        let flag = values.password !== values.confirmPassword;
        setValues({...values, confirmPasswordError: flag});
        handleChange('confirmPassword', e);
    };*/

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const email = event.target.email.value;

        setValues({...values, finishAsync: false});
        await UserService.createUser(username, email, password).then(() => {
            setValues({...values, finishAsync: true});
            history.push("/sign-in");
        }).catch((err) => {
            setValues({...values, finishAsync: true});
            document.getElementById("signUpError")
                .innerText = err.response ?
                (err.response.data.error + ": " + err.response.data.message.toString())
                : err;
        });
    };

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
                        margin='normal'
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        error={values.usernameError}
                        // onBlur={validate(values.username, regex.username)}
                        onChange={handleChange('username')}
                        inputProps={{tabIndex: "1"}}
                    />
                    {values.usernameError && <ErrorMessage title={messages.username}/>}
                </InputError>
                <InputError>
                    <TextField
                        type='email'
                        margin='normal'
                        name="email"
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        error={values.emailError}
                        // onBlur={validate(values.email, regex.email)}
                        onChange={handleChange('email')}
                        inputProps={{tabIndex: "2"}}
                    />
                    {values.emailError && <ErrorMessage title={messages.email}/>}
                </InputError>

                <InputError>
                    <FormControl
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name={"password"}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            error={values.passwordError}
                            // onBlur={validate(values.password, regex.password)}
                            inputProps={{tabIndex: "3"}}
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
                    {values.passwordError && <ErrorMessage title={messages.minLength}/>}
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
                            error={values.confirmPasswordError}
                            onChange={handleChange('confirmPassword')}
                            inputProps={{tabIndex: "4"}}
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
                    {values.confirmPasswordError && <ErrorMessage title={messages.mismatch}/>}
                </InputError>
                <ButtonLoad
                    text={'Sign up'}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    loading={!values.finishAsync}
                    radius={"24px"}
                    tabIndex={5}
                    disabled={!values.finishAsync}
                />
                <div className='text-danger' id={"signUpError"}>&nbsp;</div>
            </form>
        </Sign>
    );
}