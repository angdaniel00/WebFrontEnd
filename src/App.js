import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Redirect} from 'react-router-dom';
import Header from './components/layout/Header';
import Dashboard from './components/leads/Dashboard';
import {Provider} from 'react-redux';
import store from './store';
import { Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './components/layout/Alerts';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import PrivateRoute from './components/commom/PrivateRoute';
import {loadUser} from './actions/auth';

const AlertOptions={
  timeout:3000,
  position: 'top center'
}

export class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...AlertOptions}>
            <Router>
              <Fragment>
                <Header/>
                <Alerts/>
                <div className="container">
                  <Switch>
                    <PrivateRoute exact path="/" component={Dashboard}/>
                  </Switch>
                  <Switch>
                    <Route exact path="/login" component={Login}/>
                  </Switch>
                  <Switch>
                    <Route exact path="/register" component={Register}/>
                  </Switch>
                </div>        
              </Fragment>
            </Router>
          </AlertProvider>
        </Provider>
      </div>
    )
  }
}

export default App
