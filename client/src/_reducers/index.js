import { combineReducers } from 'redux';
import user from './user_reducer';
import comment from './comment_reducer';

const rootReducer = combineReducer({
    user,
    comment
})

export default rootReducer;