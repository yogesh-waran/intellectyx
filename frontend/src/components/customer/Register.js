import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Api from '../../utils/Api';

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

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

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            errors: []
        }
    }

    register = (e) => {
        e.preventDefault();

        const userData = this.state;

        Api('post', '/users/register', userData)
            .then(res => {
                console.log(res)
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.props.history.push('/login');
                    }
                }
            })
            .catch(err => console.log(err))
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
                    <div className={'paper_signup'}>
                        <Avatar className={'avatar'}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        {this.state.errors && this.state.errors.map((error) => 
                            <Alert className={'alert'} severity="error">{error.message}</Alert>
                        )}
                        <form className={'form'} method="post" noValidate onSubmit={this.register}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="firstname"
                                label="Firstname"
                                name="firstname"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="lastname"
                                label="Lastname"
                                name="lastname"
                                autoFocus
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={'submit'}
                            >
                                Sign Up
                            </Button>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>            
        );
    }
}

export default withRouter(Register);