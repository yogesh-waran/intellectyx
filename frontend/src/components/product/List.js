import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

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
    TableSortLabel
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LeftNavigation from '../common/LeftNav';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Product Name' },
    { id: 'price', numeric: false, disablePadding: false, label: 'Product Price' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            errors: [],
            success: "",
        }
    }

    componentDidMount() {
        this.getProducts();
    }
    
    getProducts = () => {
        Api('get', '/product/list')
            .then(res => {
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.setState({products: res.data})
                    }
                }
            })
            .catch(err => console.log(err))
    }

    delete = (id) => {
        Api('post', `/product/delete/${id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.getProducts();
                    }
                }
            })
            .catch(err => console.log(err))
    }

    order = (prodid) => {
        let active_user = reactLocalStorage.getObject('_user');

        let data = {
            product_id: prodid,
            user_id: active_user._id,
        }

        Api('post', `/customer_transaction/create`, data)
            .then(res => {
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.setState({success: "Your order has been added successfully!"});
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
                                        <TableSortLabel
                                            direction={'asc'}
                                        >
                                            {headCell.label}
                                            {null}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.products.map((product) => (
                                <TableRow>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        <Link to={"/product-edit/" + product._id}>Edit</Link>
                                        {' '}
                                        <Link onClick={() => this.delete(product._id)}>Delete</Link>
                                        {' '}
                                        <Link onClick={() => this.order(product._id)}>Order</Link>
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

export default withRouter(ProductList);