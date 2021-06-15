import {
	ADD_COIN,DELETE_COIN
} from '../_actions/types';
 
export default function(state={}, action){
    switch(action.type){
        case ADD_COIN:
            return {...state, register: action.payload }
        case DELETE_COIN:
            return { ...state, loginSucces: action.payload }
        default:
            return state;
    }
}