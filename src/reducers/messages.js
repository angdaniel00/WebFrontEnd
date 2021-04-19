import {GET_MESSAGES, CREATE_MESSAGE} from '../actions/types';

const initialState = {}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
    switch (action.type){
        case GET_MESSAGES:
            return action.payload;
        case CREATE_MESSAGE:
            return {
                state: action.payload
            }
        default:
            return state;
    }
}