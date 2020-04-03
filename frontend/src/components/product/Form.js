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

class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            id: "",
            name: "",
            price: "",
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.state.id = id;

        if (id) {
            Api('get', `/product/get/${id}`)
                .then(res => {
                    console.log(res)
                    if (res.data) {
                        if (res.data.errors) {
                            this.setState({errors: res.data.errors});
                        } else {
                            this.setState({
                                product: res.data,
                                name: res.data.name,
                                price: res.data.price,
                            });
                        }
                    }
                })
                .catch(err => console.log(err))
        }
    }

    update = (e) => {
        e.preventDefault();

        const prodData = this.state;

        let action = this.state.id ? 'update' : 'create';

        Api('post', '/product/' + action, prodData)
            .then(res => {
                console.log(res)
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.props.history.push('/products');
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
                                    id="name"
                                    label="Product Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="price"
                                    label="Product Price"
                                    name="price"
                                    value={this.state.price}
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

export default withRouter(ProductForm);