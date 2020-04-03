import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LogoutIcon from '@material-ui/icons/ExitToApp';

class LeftNavigation extends Component {
    logout = () => {
        reactLocalStorage.clear();
        this.props.history.push('/login');
    }

    goTo = (path) => {
        this.props.history.push(path);
    }

    render () {
        return (
            <div>
                <ListItem onClick={() => this.goTo('/dashboard')} button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem onClick={() => this.goTo('/orders')} button>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>
                <ListItem onClick={() => this.goTo('/customers')} button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItem>
                <ListItem onClick={() => this.goTo('/products')} button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItem>
                <ListItem onClick={() => this.goTo('/reports')} button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
                <ListItem onClick={this.logout} button>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </div>
        )
    }
}

export default withRouter(LeftNavigation);