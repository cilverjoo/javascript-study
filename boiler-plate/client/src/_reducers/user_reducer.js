import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } //... : 스프레드 오퍼레이터, 똑같이 가져온다.
        case REGISTER_USER:
            return {...state, register: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        default:
            return state;
    }
}