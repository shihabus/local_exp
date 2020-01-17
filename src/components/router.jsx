import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch,Redirect} from 'react-router-dom'
import {Dashboard, Login,Landing,NotFound} from '../screens'
import {routes} from '../config'


class PrivateRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: true
    };
  }

  componentDidMount() {
    // check if user is Authenticated
    this.authenticate();
  }

  authenticate = () => {
    const { authenticated } = this.props.location;
    if (authenticated) {
      this.setState({ isAuthenticated: true, isLoading: false });
    }else{
        this.setState({ isAuthenticated: false, isLoading: false });
    }
  };

  render() {
    const { component: Component, ...rest } = this.props;
    const { isLoading, isAuthenticated } = this.state;
    if (isLoading) return (
        <div>
            <h2>Loading...</h2>
        </div>
    );

    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: routes.LOGIN
              }}
            />
          );
        }}
      />
    );
  }
}

export const Routes=()=>(
  <Router>
        <Switch>
          <Route exact path={routes.HOME} component={Landing} />
          <PrivateRoutes path={routes.DASHBOARD} component={Dashboard} />
          <Route path={routes.LOGIN} component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
)
