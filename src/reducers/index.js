import {combineReducers} from 'redux';
import students from './students';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import career from './career';
import course from './course';
import ticket from './ticket';

export default combineReducers({
   students,
   errors,
   messages,
   auth,
   career,
   course,
   ticket
});