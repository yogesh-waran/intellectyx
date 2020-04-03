import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';

import Api from '../../utils/Api';

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Paper,
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

import '../auth/auth.css';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://localhost:2019/">
                MERN Tech
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    auth = (e) => {
        e.preventDefault();
        const userData = this.state;
        console.log(this.props)

        if (userData.username && userData.username.length > 0 &&
            userData.password && userData.password.length > 0) {
            Api('post', '/auth', this.state)
                .then(res => {
                    console.log(res)
                    if (res.data) {
                        reactLocalStorage.setObject('_user', res.data.userData);
                        reactLocalStorage.setObject('_decoded', res.data.decoded);
                        reactLocalStorage.set('_token', res.data.token);
                        this.props.history.push('/dashboard');
                    }
                })
                .catch(err => console.log(err))
        } else {

        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {

        return (
            <Grid container component="main" className={'root'}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={'image'} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={'paper'}>
                        <Avatar className={'avatar'}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={'form'} method="post" noValidate onSubmit={this.auth}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Email Address"
                                name="username"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={'submit'}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(Login);