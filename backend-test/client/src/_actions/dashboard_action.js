import Axios from 'axios';
import { ADD_COIN, DELETE_COIN } from './types';

export function addCoin(dataToSubmit){

	const request = Axios.post('/api/dashboard/addcoin', dataToSubmit)
		.then(response => response.data);

	return ({
		type: ADD_COIN,
		payload: request
	})
}

export function deleteCoin(dataToSubmit){

	const request = Axios.post('/api/dashboard/deletecoin', dataToSubmit)
	.then(response => response.data);

	return ({
		type: DELETE_COIN,
		payload: request
	})
}