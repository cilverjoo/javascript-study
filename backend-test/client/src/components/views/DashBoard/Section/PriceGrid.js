import React, {useState, useEffect} from 'react'
import axios from 'axios';
import BithumbPrice from './BithumbPrice';
import UpbitPrice from './UpbitPrice';
import CoinonePrice from './CoinonePrice';
import '../DashBoard.css';

function PriceGrid(props) {

	const userEmail = props.userEmail;
	const coinList = props.coinList;

	const [Target, setTarget] = useState("BTC");

	let TargetLists = coinList.map((target) => {
		console.log(target);
		return (target);
	})

	return (
		<div>
			<h2>BTC</h2>
			<table className="type02">
				<thead>
					<tr>
						<th></th>
						<th>Closing Price</th>
						<th>Prev Closing Price</th>
						<th>Change Rate</th>
					</tr>
				</thead>
				<tbody>
					<BithumbPrice target={Target} />
					<UpbitPrice target={Target}/>
					{/* <CoinonePrice target={Target} /> */}
				</tbody>
			</table>
		</div>
	)
}

export default PriceGrid;