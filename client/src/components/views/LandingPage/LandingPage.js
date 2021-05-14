import React, {useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello') //엔드포인트가 /api/hello인 리퀘스트를 서버에 보내서
        .then(response => console.log(response.data)) //서버에서 돌아오는 res를 콘솔에서 보여준다.
    }, [])
    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage