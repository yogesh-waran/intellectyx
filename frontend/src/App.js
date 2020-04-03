import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import Login from './components/auth/Login';
import Register from './components/customer/Register';
import Dashboard from './components/customer/Dashboard';
import Customers from './components/customer/Customers';
import CustomerEdit from './components/customer/CustomerEdit';
import ProductList from './components/product/List';
import ProductForm from './components/product/Form';
import OrderList from './components/orders/List';
import Report from './components/report/Report';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <PublicRoute restricted={true} component={Login} path="/" exact />
            <PublicRoute restricted={true} component={Login} path="/login" exact />
            <PublicRoute restricted={true} component={Register} path="/register" exact />
            <PrivateRoute component={Dashboard} path="/dashboard" exact />
            <PrivateRoute component={Customers} path="/customers" exact />
            <PrivateRoute component={CustomerEdit} path="/customer-edit/:id" exact />
            <PrivateRoute component={OrderList} path="/orders" exact />
            <PrivateRoute component={ProductList} path="/products" exact />
            <PrivateRoute component={ProductForm} path="/product-add" exact />
            <PrivateRoute component={ProductForm} path="/product-edit/:id" exact />
            <PrivateRoute component={Report} path="/reports" exact />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;