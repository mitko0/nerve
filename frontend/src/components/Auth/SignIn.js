import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {
    TextField,
    FormControlLabel,
    Checkbox,
    makeStyles,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    OutlinedInput
} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import clsx from "clsx";

import Sign from "./Sign";
import ButtonLoad from "../CustomInput/ButtonLoad";

import AuthenticationService from '../../repository/axiosAuthenticationRepository';
import LSService from "../../repository/localStorage";


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = (props) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
        finishAsync: true,
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleAuthentication = async (event) => {
        event.preventDefault();

        const auth = {
            "username": event.target.username.value,
            "password": event.target.password.value,
            "remember": event.target.remember.checked
        };

        setValues({...values, finishAsync: false});
        await AuthenticationService.authenticateWithUser(auth).then(({data: {attr1, attr2}}) => {
            LSService.setItem('user', attr1);
            LSService.setItem('jwt', attr2);
            setValues({...values, finishAsync: true});
        }).catch((error) => {
            document.getElementById("signInError")
                .innerHTML = error.response ? error.response.data.toString() : error;
            setValues({...values, finishAsync: true});
            //console.clear();
        });

    };

    const {from} = props.location.state || {from: {pathname: '/'}};
    return (
        <div>
            {
                LSService.checkToken()
                && <Redirect to={from}/>
            }
            <Sign
                title={"Sign In"}
                description={"Don't have an account?"}
                linkText={"Sign up"}
                to={"/sign-up"}
                footer
            >
                <form
                    className={classes.form}
                    onSubmit={handleAuthentication}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                    />
                    <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name={"password"}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
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

                    <FormControlLabel
                        control={<Checkbox name="remember" color="secondary"/>}
                        label="Remember me"
                    />
                    <ButtonLoad
                        text={'Sign in'}
                        disabled={!values.finishAsync}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        loading={!values.finishAsync}
                        radius={"24px"}
                    />
                    <div className='text-danger' id={"signInError"}>&nbsp;</div>
                </form>
            </Sign>
        </div>
    );
};

export default SignIn;