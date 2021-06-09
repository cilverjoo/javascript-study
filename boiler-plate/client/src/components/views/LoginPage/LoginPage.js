import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; //dispatch는 "React Component"가 action을 취하게 한다!
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //이게 없으면 login 버튼을 누를 때마다 페이지가 refresh됨.

        console.log('Email', Email);
        console.log('Password', Password);

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)) //action 이름이 loginUser
        .then(response => {
            if (response.payload.loginSuccess) {
                props.history.push('/') //LandingPage로 이동.
            } else {
                alert("Error");
            }
        })
    }

    return (
        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',
                    width: '100%', height: '100vh' //display : 'flex' -> 화면크기에 맞춰서 컨텐츠 조절, justifyContent : 행 방향 가운데 중심, alignItens : 열 방향 가운데 중심
        }}>
            <form style={{ display : 'flex', flexDirection: 'column'}}
                    onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)