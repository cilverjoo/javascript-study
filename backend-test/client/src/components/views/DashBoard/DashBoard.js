import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addCoin } from '../../../_actions/dashboard_action';
import { deleteCoin } from '../../../_actions/dashboard_action';
import axios from 'axios';
import PriceGrid from './Section/PriceGrid';
import "./DashBoard.css";

function DashBoard(props) {

	const dispatch = useDispatch();
	const userEmail = localStorage.getItem('userEmail');
	const [AddCoin, setAddCoin] = useState("");
	const [DeleteCoin, setDeleteCoin] = useState("");
	const [CoinList, setCoinList] = useState([]);

	//올바른 값만 넣고 중복은 입력하지 않는다는 가정 하에.

	useEffect(() => {

		let variables = {
			email: userEmail
		}

		axios.post('/api/interest/getInterestCoins', variables)
		.then(response => {
			if (response.data.success) {
				setCoinList(response.data.coinList);
			} else {
				alert('Coin List를 가져오는 데 실패했습니다.');
			}
		})
	}, []);


	const onAddCoinHandler = (event) => {
		setAddCoin(event.currentTarget.value);
	}

	const onDeleteCoinHandler = (event) => {
		setDeleteCoin(event.currentTarget.value);
	}

	const onAddSubmitHandler = (event) => {
		event.preventDefault();

		if (CoinList.indexOf(AddCoin) === -1) {
			CoinList.push(AddCoin);

			console.log("after add coin list", CoinList);

			let variables = {
				userEmail: userEmail,
				coinList: CoinList
			}

			dispatch(addCoin(variables))
			.then(response => {
				if (response.payload.success) {
					alert('Adding Coin Success');
				} else {
					alert('Failed to Add Coin');
				}
				setAddCoin("");
			})
		} else {
			alert('이미 존재하는 코인입니다!');
		}
	}

	const onDeleteSubmitHandler = (event) => {

		event.preventDefault();
		const idx = CoinList.indexOf(DeleteCoin);
		if (idx !== -1) {

			CoinList.splice(idx, 1);
			console.log("after delete coin list", CoinList);

			let variables = {
				userEmail: userEmail,
				coinList: CoinList
			}
	
			dispatch(deleteCoin(variables))
			.then(response => {
				if (response.payload.success) {
					alert('Delete Coin Success')
				} else {
					alert('Failed to delete coin');
				}
				setDeleteCoin("");
			})	
		} else {
			alert("Failed to Delete coin ")
		}
	}

	return (
		<div style={{ width: '85%', margin: '3rem auto'}}>
			<h2>Dashboard</h2>
			<hr />

			<form style={{display: 'flex', flexDirection: 'row'}} onSubmit={onAddSubmitHandler}>
				<label>Add Coins</label>
				<input type="addCoin" value={AddCoin} onChange={onAddCoinHandler}/>
				<br />
				<button>add</button>
			</form>

			<form style={{display: 'flex', flexDirection: 'row'}} onSubmit={onDeleteSubmitHandler}>
				<label>Delete Coins</label>
				<input type="DeleteCoin" value={DeleteCoin} onChange={onDeleteCoinHandler} />
				<br />
				<button>delete</button>
			</form>

			<hr />

			{/* Get registered coin's prices from registered Market */}

			<div>
				<PriceGrid userEmail={userEmail} coinList={CoinList}/>
			</div>
		</div>
	)
}

export default DashBoard;
