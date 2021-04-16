import axios from 'axios';
import {ADD_COURSE, GET_COURSE, GET_COURSES, UPDATE_COURSE, DELETE_COURSE} from '../actions/types';
import { createMessage, returnErrors} from './messages';

//GET COURSE
export const getCourse = (id) => dispatch => {
    axios.get('/public/course/search/only/'+id)
        .then(res=>{
            dispatch({
                type: GET_COURSE,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET COURSES Like
export const getCoursesLike= (id) => dispatch => {
    axios.get('/public/course/search/like/'+id)
        .then(res=>{
            dispatch({
                type: GET_COURSES,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET ALL COURSES
export const getCourses = () => dispatch => {
    axios.get('/public/course/all')
        .then(res=>{
            dispatch({
                type: GET_COURSES,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE COURSE
export const deleteCourse = (id) => dispatch => {
    axios.delete('/private/course/'+id)
        .then(res=>{
            dispatch(createMessage({deleteCourse: 'Course deleted'}))
            dispatch({
                type: DELETE_COURSE,
                payload: id
            })
        }).catch(err => console.log(err));
}

//ADD COURSE
export const addCourse = (course) => dispatch => {
    axios.post('/private/course/' + course, null)
        .then(res=>{
            dispatch(createMessage({addCourse: 'Course added'}))
            dispatch({
                type: ADD_COURSE,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//UPDATE Ticket
export const updateCourse = (course) => dispatch => {
    axios.put('/private/course', course)
        .then(res=>{
            dispatch(createMessage({updateCourse: 'Course updated'}))
            dispatch({
                type: UPDATE_COURSE,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}