import axios from 'axios';
import {GET_STUDENTS, DELETE_STUDENT, ADD_STUDENT, UPDATE_STUDENT, CHANGE_STUDENT} from './types';
import { createMessage, returnErrors} from './messages';
import {tokenConfig} from './auth';

const fixedStudent = (student)=>{
    student.math=student.math?student.math:-1;
    student.spanish=student.spanish?student.spanish:-1;
    student.history=student.history?student.history:-1;
    student.noteFinal=student.noteFinal?student.noteFinal:-1;
    return student;
}

export const getStudent = (student) => dispatch => {
    axios.get('/public/student/search/'+student.id)
        .then(res=>{
            dispatch({
                type: CHANGE_STUDENT,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET Students of a Course
export const getStudentsAllCourse = (id, showError, clean) => dispatch => {
    axios.get('/public/student/all/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
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
export const getEscalafon = (id, showError, clean) => dispatch => {
    axios.get('/public/student/escalafon/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
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

//Aprobados
export const getAprobados = (id, showError, clean) => dispatch => {
    axios.get('public/student/aprobados/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
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

//Desaprobados
export const getDesaprobados = (id, showError, clean) => dispatch => {
    axios.get('public/student/desaprobados/'+id)
        .then(res=>{
            dispatch({
                type: GET_STUDENTS,
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
            const st = res.data
            st.nameCareer=null
            dispatch(createMessage({addStudent: 'Student added'}))
            dispatch({
                type: ADD_STUDENT,
                payload: st
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//UPDATE Student
export const updateStudent = (student) => (dispatch, getState) => {
    student = fixedStudent(student);
    axios.put('/private/student', student, tokenConfig(getState))
        .then(res=>{
            const st = res.data
            st.nameCareer = student.nameCareer
            dispatch(createMessage({updateStudent: 'Student updated'}))
            dispatch({
                type: UPDATE_STUDENT,
                payload: st
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//Asign Career Student
export const asignCareer = (id, showError, clean, success) => (dispatch, getState) => {
    axios.post('/private/student/asign/'+id, null,tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({asigCareerStudent: 'Asign career student'}))
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
            clean()
            success()
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            switch(err.response.status){
                case 400:
                    showError('No hay boletas registradas')
                    break
                case 403:
                    showError('No hay alumnos registrados')
                    break
                case 404:
                    showError('Nota de las Pruebas de Ingreso o nota final incompleta o boleta')
                    break
                case 501:
                    showError('No hay carreras registradas')
                    break
                default:
                    showError('Error desconocido')
                    break
            }
        });
}

//Calcule note final of Student
export const calNoteFinal = (id, showError, clean, success) => (dispatch, getState) => {
    axios.post('/private/student/calc/'+id, null,tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({calNoteFinal: 'Calcule note final Student'}))
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
            clean()
            success()
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            switch(err.response.status){
                case 403:
                    showError('No hay alumnos registrados')
                    break
                case 404:
                    showError('Notas incompletas')
                    break
                default:
                    showError('Error desconocido')
                    break
            }
        });
}