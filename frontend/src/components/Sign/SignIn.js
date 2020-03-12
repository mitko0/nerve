import React from 'react';
import {useHistory} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from '@material-ui/core/styles';
import AuthenticationService from '../../repository/axiosAuthenticationRepository';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Sign from "./Sign";
import LoadButton from "../CustomInput/LoadButton";

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

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        weightRange: '',
        showPassword: false,
        finishAsync: true
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

    const authenticate = async (event) => {
        event.preventDefault();

        const auth = {
            "username": event.target.username.value,
            "password": event.target.password.value,
            "remember": event.target.remember.checked
        };

        setValues({...values, finishAsync: false});
        await AuthenticationService.authenticate(auth).then((response) => {
            window.localStorage.setItem("jwt", response.data.jwt);
            setValues({...values, finishAsync: true});
            history.push("/home");
        }).catch((error) => {
            document.getElementById("signInError")
                .innerHTML = error.response ? error.response.data.toString() : error;
            setValues({...values, finishAsync: true});
            //console.clear();
        });
    };

    return (
        <Sign title={"Sign In"}
              footer
              description={"Don't have an account?"}
              linkText={"Sign up"}
              to={"/sign-up"}
        >
            <form className={classes.form} onSubmit={authenticate}>
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

                <FormControl className={clsx(classes.margin, classes.textField)}
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
                    control={<Checkbox name="remember" color="primary"/>}
                    label="Remember me"
                />
                <LoadButton
                    text={'Sign in'}
                    disabled={!values.finishAsync}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    loading={values.finishAsync}
                    radius={"24px"}
                />

                <div className='text-danger' id={"signInError"}>&nbsp;</div>
            </form>
        </Sign>
    );
}