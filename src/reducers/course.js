import {ADD_COURSE, GET_COURSE, GET_COURSES, UPDATE_COURSE, DELETE_COURSE} from '../actions/types';

const initialState = {
    courses:[],
    courseSelect: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state= initialState, action) {
    switch (action.type){
        case GET_COURSES:
            return{
                ...state,
                courses: action.payload
            };
        case DELETE_COURSE:
            return { 
                ...state, 
                careers: state.courses.filter(course => course.id !== action.payload) 
            }
        case ADD_COURSE:
            return{
                ...state,
                courses: [...state.courses, action.payload]
            }
        case GET_COURSE:
            return{
                ...state,
                courseSelect: action.payload
            }
        case UPDATE_COURSE:
            return{
                ...state,
                careers: [...state.courses.filter(course => course.id !== action.payload.id), action.payload]
            }
        default:
            return state
    }
}