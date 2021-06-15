import React, {useState} from 'react';
import axios from 'axios';
import { COINONE_URL } from '../../../Config';

function CoinonePrice(props) {

	const endpoint = `${COINONE_URL}${props.target}`;
	const [LastPrice, setLastPrice] = useState(0);
	const [PrevPrice, setPrevPrice] = useState(0);
	const [ChangePrice, setChangePrice] = useState(0);

	const getPrices = () => {
		try {
			return axios.get(endpoint);	
		} catch (err) {
			console.log(err);
		}
	}; 

	const takePrices = () => {
		const results = getPrices()
			.then(response => response.json())
			.then(response => {
				if (LastPrice === 0) {
					setPrevPrice(response.last);
				} else {
					setPrevPrice(LastPrice);
				}
				setLastPrice(response.last);
				setChangePrice(LastPrice - PrevPrice);
			})
			.catch(error => {
				console.log(error);
			})
	};

	takePrices();

	return (
		<tr>
			<th scope="row">upbit</th>
			<td>{LastPrice.toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
			<td>{PrevPrice.toString()
				.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
			<td>{ChangePrice.toString()
				.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
		</tr>
	)
};

export default CoinonePrice;