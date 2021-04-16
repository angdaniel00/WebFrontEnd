import {GET_CAREERS, ADD_CAREER, UPDATE_CAREER, DELETE_CAREER} from '../actions/types';

const initialState = {
    careers:[]
}

export default function(state= initialState, action) {
    switch (action.type){
        case GET_CAREERS:
            return{
                ...state,
                careers: action.payload
            };
        case DELETE_CAREER:
            return { 
                ...state, 
                careers: state.careers.filter(career => career.id !== action.payload) 
            }
        case ADD_CAREER:
            return{
                ...state,
                careers: [...state.careers, action.payload]
            }
        case UPDATE_CAREER:
            return{
                ...state,
                careers: [...state.careers.filter(career => career.id !== action.payload.id), action.payload]
            }
        default:
            return state
    }
}