import axios from 'axios';
import {
    LOGIN_USER, REGISTER_USER
} from './types';

export function loginUser(dataToSubmit) {
    
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request  //reducer에서 previous state와 action을 조합해서 nextState를 return해 주므로 Reducer로 보낸다.
    }
}

export function registerUser(dataToSubmit) {
    
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}