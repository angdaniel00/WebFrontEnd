import axios from 'axios';
import { returnErrors} from './messages';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () =>(dispatch, getState) =>{

    axios.get('/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Login user
export const login = (username, password) =>dispatch =>{
 //User Loading
    dispatch({type: USER_LOADING});

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    const body = JSON.stringify({username, password})

    axios.post('/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

//Logout user
export const logout = () =>(dispatch, getState) =>{

    axios.post('/logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}

//Setup config with token -helper function
export const tokenConfig = getState => {
    //Get token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //If token, add to headers config
    if(token){
        config.headers['Authorization'] = token;
    }

    return config;
}