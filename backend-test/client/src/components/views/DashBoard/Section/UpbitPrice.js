import React, {useState} from 'react';
import { UPBIT_URL } from '../../../Config';

function UpbitPrice(props) {

	const endpoint = `${UPBIT_URL}${props.target}`;
	const [ClosingPrice, setClosingPrice] = useState(0);
	const [ChangePrice, setChangePrice] = useState(0);

	const getPrices = () => {
		try {
			return fetch(endpoint);	
		} catch (err) {
			console.log(err);
		}
	};

	const takePrices = () => {
		const results = getPrices()
			.then(response => response.json())
			.then(response => {
				setClosingPrice(response[0].tradePrice);
				setChangePrice(response[0].changePrice);
			})
			.catch(error => {
				console.log(error);
			})
	};

	takePrices();

	return (
		<tr>
			<th scope="row">upbit</th>
			<td>{ClosingPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
			<td>{ChangePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
		</tr>
	)
};

export default UpbitPrice;