import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BITHUMB_URL } from '../../../Config';

function BithumbPrice(props) {

	const endpoint = `${BITHUMB_URL}${props.target}`;
	const [ClosingPrice, setClosingPrice] = useState(0);
	const [PrevClosingPrice, setPrevClosingPrice] = useState(0);
	const [Time, setTime] = useState(0);

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

				setClosingPrice(response.data.closing_price);
				setPrevClosingPrice(response.data.prev_closing_price);
			})
			.catch(error => {
				console.log(error);
			})
		let date = new Date();
		setTime(parseInt(date.getTime() / 1000));

	};

	useEffect(() => {

		let date = new Date();
		setTime(parseInt(date.getTime() / 1000));
		takePrices();

	}, [Time]);

	return (
		<tr>
			<th scope="row">bithumb</th>
			<td>{ClosingPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
			<td>{PrevClosingPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
			<td>{(ClosingPrice - PrevClosingPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
		</tr>
	)
};

export default BithumbPrice;
