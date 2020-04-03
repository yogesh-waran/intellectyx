import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Api from '../../utils/Api';

import {
    CssBaseline,
    Paper,
    Grid,
    Typography,
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
    { id: 'firstname', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastname', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email Address' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

class Customers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }

    componentDidMount() {
        this.getUsers();
    }
    
    getUsers = () => {
        Api('get', '/users/list')
            .then(res => {
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.setState({customers: res.data})
                    }
                }
            })
            .catch(err => console.log(err))
    }

    delete = (id) => {
        Api('post', `/users/delete/${id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errors) {
                        this.setState({errors: res.data.errors});
                    } else {
                        this.getUsers();
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
                    <h1>Customers List</h1>
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
                            {this.state.customers.map((customer) => (
                                <TableRow>
                                    <TableCell>{customer.firstname}</TableCell>
                                    <TableCell>{customer.lastname}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>
                                        <Link to={"/customer-edit/" + customer._id}>Edit</Link>
                                        {' '}
                                        <Link onClick={() => this.delete(customer._id)}>Delete</Link>
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

export default withRouter(Customers);