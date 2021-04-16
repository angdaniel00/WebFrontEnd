import axios from 'axios';
import {ADD_TICKET, GET_TICKET, GET_TICKETS, UPDATE_TICKET, DELETE_TICKET} from '../actions/types';
import { createMessage, returnErrors} from './messages';

//GET Ticket of Student
export const getTicketStudent = (id) => dispatch => {
    axios.get('/public/student/boleta/'+id)
        .then(res=>{
            dispatch({
                type: GET_TICKET,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET Tickets
export const getTickets = () => dispatch => {
    axios.get('/public/ticket/all')
        .then(res=>{
            dispatch({
                type: GET_TICKETS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET Tickets Course
export const getTicketsCourse = (course) => dispatch => {
    axios.get('/public/ticket/all/'+course)
        .then(res=>{
            dispatch({
                type: GET_TICKETS,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE Ticket
export const deleteTicket = (id) => dispatch => {
    axios.delete('/private/boleta/'+id)
        .then(res=>{
            dispatch(createMessage({deleteTicket: 'Ticket deleted'}))
            dispatch({
                type: DELETE_TICKET,
                payload: id
            })
        }).catch(err => console.log(err));
}

//ADD Ticket
export const addTicket = (ticket) => dispatch => {
    axios.post('/private/boleta', ticket)
        .then(res=>{
            dispatch(createMessage({addTicket: 'Ticket added'}))
            dispatch({
                type: ADD_TICKET,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//UPDATE Ticket
export const updateTicket = (ticket) => dispatch => {
    axios.put('/private/boleta', ticket)
        .then(res=>{
            dispatch(createMessage({updateTicket: 'Ticket updated'}))
            dispatch({
                type: UPDATE_TICKET,
                payload: res.data
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}