import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Api from '../../utils/Api';

import {
    CssBaseline,
    Button,
    Paper,
    Grid,
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
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            errors: [],
            success: "",
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

    render() {
        return (
            <Grid container component="main" className={'root'}>
                <CssBaseline />
                <Grid item xs={3} sm={3} md={2}>
                    <LeftNavigation />
                </Grid>
                <Grid item xs={9} sm={9} md={10} component={Paper} elevation={6} square>
                    <h1>Products List</h1>
                    <Button onClick={() => this.props.history.push('/product-add')}>Add Product</Button>
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
                                    <TableCell>
                                        <Link onClick={() => this.delete(order._id)}>Delete</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(OrderList);