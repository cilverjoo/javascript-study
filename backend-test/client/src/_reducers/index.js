import { combineReducers } from 'redux';
import user from './user_reducer';
import dashboard from './dashboard_reducer';

const rootReducer = combineReducers({
	user,
	dashboard
})

export default rootReducer;