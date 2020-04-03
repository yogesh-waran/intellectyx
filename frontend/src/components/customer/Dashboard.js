import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
    CssBaseline,
    Paper,
    Grid,
    Typography
} from '@material-ui/core';
import LeftNavigation from '../common/LeftNav';

class Dashboard extends Component {

    render() {
        return (
            <Grid container component="main" className={'root'}>
                <CssBaseline />
                <Grid item xs={3} sm={3} md={2}>
                    <LeftNavigation />
                </Grid>
                <Grid item xs={9} sm={9} md={10} component={Paper} elevation={6} square>
                    <h1>Welcome to IntellectYX Dashboard</h1>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Dashboard);