import axios from 'axios';
import {GET_ACTUAL, ADD_COURSE, GET_COURSE, GET_COURSES, UPDATE_COURSE, DELETE_COURSE} from '../actions/types';
import { createMessage, returnErrors} from './messages';
import {tokenConfig} from './auth';

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
export const getCourses = (showError, clean) => dispatch => {
    axios.get('/public/course/all')
        .then(res=>{
            dispatch({
                type: GET_COURSES,
                payload: res.data
            })
            if(clean)
                clean()
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            if(showError)
                showError()
        });
}

//GET ACTUAL
export const getActual = () => dispatch => {
    axios.get('/public/course/actual')
        .then(res=>{
            dispatch({
                type: GET_ACTUAL,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE COURSE
export const deleteCourse = (id) => (dispatch, getState) => {
    axios.delete('/private/course/'+id, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({deleteCourse: 'Course deleted'}))
            dispatch({
                type: DELETE_COURSE,
                payload: id
            })
        }).catch(err => console.log(err));
}

//ADD COURSE
export const addCourse = (course) => (dispatch, getState) => {
    axios.post('/private/course/' + course, null, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({addCourse: 'Course added'}))
            dispatch({
                type: ADD_COURSE,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//UPDATE Ticket
export const updateCourse = (course) => (dispatch, getState) => {
    axios.put('/private/course', course, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({updateCourse: 'Course updated'}))
            dispatch({
                type: UPDATE_COURSE,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}