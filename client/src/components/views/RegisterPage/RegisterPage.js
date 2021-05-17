import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux'; //dispatch는 "React Component"가 action을 취하게 한다!
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //이게 없으면 login 버튼을 누를 때마다 페이지가 refresh됨.

        if (Password !== ConfirmPassword) {
            return alert('Password and Cofirm Password must be same :(');
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body)) //action 이름이 loginUser
        .then(response => {

            if (response.payload.success) {
                props.history.push("/login");
            } //else alert가 있으면 success : false가 되는 이유가 모지.
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
            
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler} />
            
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

            <br />
            <button type="submit">
                Register
            </button>
        </form>
    </div>
    )
}

export default withRouter(RegisterPage)