import axios from 'axios';
import {ADD_TICKET, GET_TICKET, GET_TICKETS, UPDATE_TICKET, DELETE_TICKET} from '../actions/types';
import { createMessage, returnErrors} from './messages';
import {tokenConfig} from './auth';

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
export const getTicketsCourse = (course) => (dispatch, getState) => {
    axios.get('/public/ticket/all/'+course)
        .then(res=>{
            const state = getState()
            state.students.students = res.data.students
            state.career.careers = res.data.careers
            dispatch({
                type: GET_TICKETS,
                payload: res.data.tickets
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE Ticket
export const deleteTicket = (id) => (dispatch, getState) => {
    axios.delete('/private/boleta/'+id, tokenConfig(getState))
        .then(res=>{
            var student =  getState().students.students.find(st=>st.ticket===id)
            student.ticket=null
            dispatch(createMessage({deleteTicket: 'Ticket deleted'}))
            dispatch({
                type: DELETE_TICKET,
                payload: id
            })
        }).catch(err => console.log(err));
}

//ADD Ticket
export const addTicket = (ticket) => (dispatch, getState) => {
    axios.post('/private/boleta', ticket, tokenConfig(getState))
        .then(res=>{
            const ticketC = res.data
            var student =  getState().students.students.find(st=>st.id===ticket.student)
            ticketC.studentName = student.name
            student.ticket=ticketC.id
            dispatch(createMessage({addTicket: 'Ticket added'}))
            dispatch({
                type: ADD_TICKET,
                payload: ticketC
            })
        }).catch(err => console.log(err))
}

//UPDATE Ticket
export const updateTicket = (ticket) => (dispatch, getState) => {
    axios.put('/private/boleta', ticket, tokenConfig(getState))
        .then(res=>{
            const ticketC = res.data
            var student =  getState().students.students.find(st=>st.id===ticket.student)
            ticketC.studentName = student.name
            dispatch(createMessage({updateTicket: 'Ticket updated'}))
            dispatch({
                type: UPDATE_TICKET,
                payload: ticketC
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}