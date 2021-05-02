import axios from 'axios';
import { returnErrors} from './messages';
import { USER_LOADING, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from './types';

// Login user
export const login = (username, password, failed) =>dispatch =>{
 //User Loading
    dispatch({type: USER_LOADING});

    //Headers
    const config = {
        headers: {
            'Content-Type': "application/json",
            'Accept':"*/*",
        }
    }

    //Request Body
    const body = JSON.stringify({username, password})

    axios.post('/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.headers.authorization
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
            failed()
        })
}

export const logout = () =>(dispatch, getState)=>{
    dispatch({
        type:LOGOUT
    })
}

//Setup config with token -helper function
export const tokenConfig = getState => {
    //Get token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': "application/json",
            'Accept':"*/*",
            'Authorization': token
        }
    }

    return config;
}