import {ADD_TICKET, GET_TICKET, GET_TICKETS, UPDATE_TICKET, DELETE_TICKET} from '../actions/types';

const initialState = {
    tickets:[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state= initialState, action) {
    switch (action.type){
        case GET_TICKETS:
            return{
                ...state,
                tickets: action.payload
            };
        case DELETE_TICKET:
            return { 
                ...state, 
                tickets: state.tickets.filter(ticket => ticket.id !== action.payload) 
            }
        case ADD_TICKET:
            return{
                ...state,
                tickets: [...state.tickets, action.payload]
            }
        case GET_TICKET:
            return{
                ...state,
                ticketSelect: action.payload
            }
        case UPDATE_TICKET:
            return{
                ...state,
                tickets: [...state.tickets.filter(ticket => ticket.id !== action.payload.id), action.payload]
            }
        default:
            return state
    }
}