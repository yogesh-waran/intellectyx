import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Api from '../../utils/Api';

import {
    CssBaseline,
    Paper,
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LeftNavigation from '../common/LeftNav';

class CustomersEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: {},
            id: "",
            firstname: "",
            lastname: "",
            email: "",
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.state.id = id;

        Api('get', `/users/get/${id}`)
            .then(res => {
                console.log(res)
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.setState({
                            customer: res.data,
                            firstname: res.data.firstname,
                            lastname: res.data.lastname,
                            email: res.data.email,
                        });
                    }
                }
            })
            .catch(err => console.log(err))
    }

    update = (e) => {
        e.preventDefault();

        const userData = this.state;

        Api('post', '/users/update', userData)
            .then(res => {
                console.log(res)
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.props.history.push('/customers');
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
                <Grid item xs={3} sm={3} md={2}>
                    <LeftNavigation />
                </Grid>
                <Grid container xs={9} sm={9} md={10} component={Paper} elevation={6} square>
                    <Grid item xs={3} sm={3} md={3} elevation={6}></Grid>
                    <Grid item xs={6} sm={6} md={6} elevation={6} square>
                        <h1>Customers - Edit</h1>
                        {this.state.errors && this.state.errors.map((error) => 
                            <Alert className={'alert'} severity="error">{error.message}</Alert>
                        )}
                        <form className={'form'} method="post" noValidate onSubmit={this.update}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label="Firstname"
                                    name="firstname"
                                    value={this.state.firstname}
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
                                    value={this.state.lastname}
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
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={'submit'}
                                >
                                    SAVE
                                </Button>
                            </form>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3} elevation={6} square></Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(CustomersEdit);