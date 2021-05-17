import React, {useEffect} from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello') //엔드포인트가 /api/hello인 리퀘스트를 서버에 보내서
        .then(response => console.log(response.data)) //서버에서 돌아오는 res를 콘솔에서 보여준다.
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if (response.data.success) {
                props.history.push("/login");
            } else {
                alert('로그아웃에 실패했습니다.');
            }
        })
    }

    return (
        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',
                    width: '100%', height: '100vh' //display : 'flex' -> 화면크기에 맞춰서 컨텐츠 조절, justifyContent : 행 방향 가운데 중심, alignItens : 열 방향 가운데 중심
        }}>
            <h2>시작페이지</h2>

            <button onClick={onClickHandler}>
                LOGOUT
            </button>
        </div>
    )
}

export default withRouter(LandingPage)

//props.history.push() 를 쓰려면 react-router-dom이 필요하다.