import axios from 'axios';
import {GET_STUDENTS, DELETE_STUDENT, ADD_STUDENT, UPDATE_STUDENT} from './types';
import { createMessage, returnErrors} from './messages';
import {tokenConfig} from './auth';

//GET Students of a Course
export const getStudentsAllCourse = (id) => dispatch => {
    axios.get('/public/student/all/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET ALL Students
export const getStudents = () => dispatch => {
    axios.get('/public/student/all')
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//SEARCH Student
export const getSearchStudent = (name) => dispatch => {
    axios.get('/public/student/search/'+name)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//Search Student Advanced
export const searchStudentAdvanced = (student) => dispatch => {
    axios.post('/public/student/search/advanced', student)
        .then(res=>{
            dispatch(createMessage({getStudent: 'Student search'}))
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Escalafon
export const getEscalafon = (id) => dispatch => {
    axios.get('/public/student/escalafon/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//Aprobados
export const getAprobados = (id) => dispatch => {
    axios.get('public/student/aprobados/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//Desaprobados
export const getDesaprobados = (id) => dispatch => {
    axios.get('public/student/desaprobados/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//Estudiantes sin carreras
export const getASC = (id) => dispatch => {
    axios.get('/public/student/asc/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE Student
export const deleteStudent = (id) => (dispatch, getState) => {
    axios.delete('/private/student/'+id, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({deleteStudent: 'Student deleted'}))
            dispatch({
                type: DELETE_STUDENT,
                payload: id
            })
        }).catch(err => console.log(err));
}

//ADD Student
export const addStudent = (student) => (dispatch, getState) => {
    axios.post('/private/student', student, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({addStudent: 'Student added'}))
            dispatch({
                type: ADD_STUDENT,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//UPDATE Student
export const updateStudent = (student) => (dispatch, getState) => {
    axios.put('/private/student', student, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({updateStudent: 'Student updated'}))
            dispatch({
                type: UPDATE_STUDENT,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Asign Career Student
export const asignCareer = (id) => (dispatch, getState) => {
    axios.post('/private/student/asig/'+id, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({asigCareerStudent: 'Asign career student'}))
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//Calcule note final of Student
export const calNoteFinal = (id) => (dispatch, getState) => {
    axios.post('/private/student/calc/'+id, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({calNoteFinal: 'Calcule note final Student'}))
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}