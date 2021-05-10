import { USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: action.payload
            }
        default:
            return state;
    }
}