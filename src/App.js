import React, {Component, Fragment} from 'react';
import {HashRouter as Router, useHistory} from 'react-router-dom';
import Header from './components/layout/Header';
import {Provider} from 'react-redux';
import store from './store';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './components/layout/Alerts';
import {Switch} from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/accounts/Login';
import PrivateRoute from './components/commom/PrivateRoute';
import {getActual, getCourses} from './actions/course';

import {Index} from './components/public/index';

import AllCareerView from './components/public/Career/view/AllCareerView';
import DispCareerView from './components/public/Career/view/DispCareerView';
import CareerDetailsView from './components/views/view/CareerDetailsView';
import AllStudentsView from './components/public/Student/view/AllStudentView';
import AprStudentView from './components/public/Student/view/AprStudentView';
import DesStudentView from './components/public/Student/view/DesStudentView';
import EscStudentView from './components/public/Student/view/EscStudentView';
import TicketsView from './components/public/Tickets/view/TicketsView';

import PCareerView from './components/private/view/CareerView';
import PCourseView from './components/private/view/CourseView';
import PStudentView from './components/private/view/StudentView';
import PTicketsView from './components/private/view/TicketsView';

import StudentDetailsView from './components/views/view/StudentDetailsView';


const AlertOptions={
  timeout:3000,
  position: 'top center'
}

export class App extends Component {

  componentDidMount(){
    store.dispatch(getCourses());
    store.dispatch(getActual());
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
                    <PrivateRoute exact path="/" component={Index} type='public'/>
                    <PrivateRoute exact path="/login" component={Login} type='public'/>
                    <PrivateRoute exact path="/allcareer" component={AllCareerView} type='public'/>
                    <PrivateRoute exact path="/dispcareer" component={DispCareerView} type='public'/>
                    <PrivateRoute exact path="/detailscareer" component={CareerDetailsView} type='public'/>
                    <PrivateRoute exact path="/allstudents" component={AllStudentsView} type='public'/>
                    <PrivateRoute exact path="/aprstudents" component={AprStudentView} type='public'/>
                    <PrivateRoute exact path="/desstudents" component={DesStudentView} type='public'/>
                    <PrivateRoute exact path="/escalafon" component={EscStudentView} type='public'/>
                    <PrivateRoute exact path="/tickets" component={TicketsView} type='public'/>
                    <PrivateRoute exact path="/private/career" component={PCareerView} type='private'/>
                    <PrivateRoute exact path="/private/course" component={PCourseView} type='private'/>
                    <PrivateRoute exact path="/private/Student" component={PStudentView} type='private'/>
                    <PrivateRoute exact path="/private/tickets" component={PTicketsView} type='private'/>
                    <PrivateRoute exact path="/studentdetails/:student" component={StudentDetailsView} type='public'/>
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
