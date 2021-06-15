import React, {useState, useEffect} from 'react'
import axios from 'axios';

function LandingPage(props) {

	const [IsLogined, setIsLogined] = useState(false);
	const [LogButton, setLogButton] = useState("Login");

	const loginButtonChanger = () => {

		const cookies = document.cookie;
		let idx = cookies.indexOf("x_auth");
		if (idx != -1) {
			setLogButton("Logout");
			setIsLogined(true);
		} else {
			setLogButton("Login");
			setIsLogined(false);
		}
	};

	useEffect(() => {
		loginButtonChanger();
	}, []);

	const onClickLoginHandler = () => {

		if (LogButton === "Login") {
			props.history.push("/login");
			setIsLogined(true);
		} else {
			axios.get('/api/users/logout')
			.then(response => {
				setIsLogined(false);
				localStorage.removeItem('userEmail');
				var date = new Date();
				date.setTime(date.getTime() - 1);
				document.cookie = "x_auth=; expires=" + date.toUTCString() + "; path=/";
				props.history.push("/");
			})
	}
}

	const onClickRegisterHandler = () => {
		props.history.push("/register");
	}

	const onClickDashboardHandler = () => {
		props.history.push("/dashboard");
	}

	return (
		<div style={{
			display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
		}}>
			<h2>LandingPage</h2>
			<br />
			<button onClick={onClickLoginHandler}>{LogButton}</button>
			{
				IsLogined ?
				<button onClick={onClickDashboardHandler}>Dashbaord</button>
				: <button onClick={onClickRegisterHandler}>Register</button>
			}
		</div>
	)
}

export default LandingPage
