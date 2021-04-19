import React, {Component, Fragment} from 'react';
import {HashRouter as Router, useHistory} from 'react-router-dom';
import Header from './components/layout/Header';
import Dashboard from './components/leads/Dashboard';
import {Provider} from 'react-redux';
import store from './store';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './components/layout/Alerts';
import {Switch} from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/accounts/Login';
import PrivateRoute from './components/commom/PrivateRoute';
import {loadUser} from './actions/auth';

import {AllCareer} from './components/public/Career/AllCareer';
import {DispCareer} from './components/public/Career/DispCareer';
import {CareerDetails} from './components/views/CareerDetails';
import {AllStudent} from './components/public/Student/AllStudent';
import {AprStudent} from './components/public/Student/AprStudent';
import {DesStudent} from './components/public/Student/DesStudent';
import {EscStudents} from './components/public/Student/EscStudent';
import {CourseStudent} from './components/public/Student/CourseStudent';
import {OtorStudent} from './components/public/Student/OtorStudent';
import {Tickets} from './components/public/Tickets/Tickets';

import {PCareer} from './components/private/Career';
import {PCourse} from './components/private/Course';
import {PStudent} from './components/private/Student';
import {PTickets} from './components/private/Tickets';

import {StudentDetails} from './components/views/StudentDetails';


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
            <Router history={useHistory}>
              <Fragment>
                <Header/>
                <Alerts/>
                  <Switch>
                    <PrivateRoute exact path="/" component={Dashboard} type='public'/>
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/login" component={Login} type='public'/>
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/allcareer" component={AllCareer} type='public'/>
                  </Switch>   
                  <Switch>
                    <PrivateRoute exact path="/dispcareer" component={DispCareer} type='public'/>
                  </Switch> 
                  <Switch>
                    <PrivateRoute exact path="/detailscareer" component={CareerDetails} type='public'/>
                  </Switch>    
                  <Switch>
                    <PrivateRoute exact path="/allstudents" component={AllStudent} type='public'/>
                  </Switch> 
                  <Switch>
                    <PrivateRoute exact path="/aprstudents" component={AprStudent} type='public'/>
                  </Switch> 
                  <Switch>
                    <PrivateRoute exact path="/despstudents" component={DesStudent} type='public'/>
                  </Switch> 
                  <Switch>
                    <PrivateRoute exact path="/escalafon" component={EscStudents} type='public'/>
                  </Switch> 
                  <Switch>
                    <PrivateRoute exact path="/coursestudents" component={CourseStudent} type='public'/>
                  </Switch> 
                  <Switch>
                    <PrivateRoute exact path="/otorstudents" component={OtorStudent} type='public'/>
                  </Switch> 
                  <Switch>
                    <PrivateRoute exact path="/tickets" component={Tickets} type='public'/>
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/private/career" component={PCareer} type='private'/>
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/private/course" component={PCourse} type='private'/>
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/private/Student" component={PStudent} type='private'/>
                  </Switch>
                  <Switch>
                    <PrivateRoute exact path="/private/tickets" component={PTickets} type='private'/>
                  </Switch> 
                  <Switch>
                    <PrivateRoute exact path="/studentdetails" component={StudentDetails} type='public'/>
                  </Switch>
              </Fragment>
            </Router>
          </AlertProvider>
        </Provider>
      </div>
    )
  }
}

export default App
