import axios from 'axios'
import {GET_CAREERS, ADD_CAREER, UPDATE_CAREER, DELETE_CAREER} from '../actions/types';
import { createMessage, returnErrors} from './messages';
import {tokenConfig} from './auth';

//GET CAREER DISP
export const getCareerDisp = (id) => dispatch => {
    axios.get('/public/career/disponibles/'+id)
        .then(res=>{
            dispatch({
                type: GET_CAREERS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//Search Career Adavanced
export const getCareerAdvanced = (career) => dispatch => {
    axios.post('/public/career/search', career)
        .then(res=>{
            dispatch(createMessage({getCareerAdvanced: 'Get career advanced'}))
            dispatch({
                type: GET_CAREERS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//GET CAREER NAME
export const getCareerName= (name) => dispatch => {
    axios.get('/public/career/search/'+name)
        .then(res=>{
            dispatch({
                type: GET_CAREERS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET ALL CAREERS
export const getCareers = () => dispatch => {
    axios.get('/public/career/all')
        .then(res=>{
            dispatch({
                type: GET_CAREERS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET ALL CAREERS
export const getCareersCourse = (id) => dispatch => {
    axios.get('/public/career/all/'+id)
        .then(res=>{
            dispatch({
                type: GET_CAREERS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE Career
export const deleteCareer = (id) => (dispatch, getState) => {
    axios.delete('/private/career/'+id, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({deleteCareer: 'Career deleted'}))
            dispatch({
                type: DELETE_CAREER,
                payload: id
            })
        }).catch(err => console.log(err));
}

//ADD Career
export const addCareer = (career) => (dispatch, getState) => {
    axios.post('/private/career', career, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({addCareer: 'Career added'}))
            dispatch({
                type: ADD_CAREER,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//UPDATE Career
export const updateCareer = (career) => (dispatch, getState) => {
    axios.put('/private/career', career, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({updateCareer: 'Career updated'}))
            dispatch({
                type: UPDATE_CAREER,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}