import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Api from '../../utils/Api';

import {
    CssBaseline,
    Button,
    Paper,
    Grid,
    Input,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LeftNavigation from '../common/LeftNav';

const headCells = [
    { id: 'order_id', numeric: false, disablePadding: true, label: 'Order ID' },
    { id: 'product_name', numeric: false, disablePadding: true, label: 'Product Name' },
    { id: 'user_name', numeric: false, disablePadding: false, label: 'User Name' },
    { id: 'ordered_date', numeric: false, disablePadding: false, label: 'Order Date' },
];

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            errors: [],
            success: "",
            search_params: {}
        }
    }

    componentDidMount() {
        this.getOrders();
    }
    
    getOrders = () => {
        Api('get', '/customer_transaction/list')
            .then(res => {
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.setState({orders: res.data})
                    }
                }
            })
            .catch(err => console.log(err))
    }

    delete = (id) => {
        Api('post', `/customer_transaction/delete/${id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.getOrders();
                    }
                }
            })
            .catch(err => console.log(err))
    }

    search = (e) => {
        e.preventDefault();

        let search_params = {
            from_date: this.state.from_date,
            to_date: this.state.to_date
        }

        Api('post', '/customer_transaction/search', search_params)
            .then(res => {
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.setState({orders: res.data})
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
        let from_date = new Date();
        let to_date = new Date();
        return (
            <Grid container component="main" className={'root'}>
                <CssBaseline />
                <Grid item xs={3} sm={3} md={2}>
                    <LeftNavigation />
                </Grid>
                <Grid item xs={9} sm={9} md={10} component={Paper} elevation={6} square>
                    <h1>Products List</h1>
                    
                    <form noValidate autoComplete="off" onSubmit={this.search}>
                        <Input
                            id="datetime-local"
                            label="From Date"
                            type="datetime-local"
                            name="from_date"
                            onChange={this.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {' to '}
                        <Input
                            id="datetime-local"
                            label="To Date"
                            type="datetime-local"
                            name="to_date"
                            onChange={this.handleChange}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <Button type="submit" variant="contained">Search</Button>
                    </form>

                    {this.state.success && (
                        <Alert className={'alert'} severity="success">{this.state.success}</Alert>
                    )}
                    {this.state.errors && this.state.errors.map((error) => 
                        <Alert className={'alert'} severity="error">{error.message}</Alert>
                    )}
                    <Table className={'table'}>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'default'}
                                        sortDirection={false}
                                    >
                                            {headCell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.orders.map((order) => (
                                <TableRow>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.products[0].name}</TableCell>
                                    <TableCell>{order.customers[0].firstname}</TableCell>
                                    <TableCell>{order.created}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Report);