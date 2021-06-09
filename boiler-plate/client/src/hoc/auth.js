import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

//SpecificComponent: App.js에서 Auth(LandingPage) 처럼 첫 번째 요소
//option: null - 아무나 출입이 가능한 페이지, true : 로그인한 유저만 출입가능한 페이지, false : 로그인한 유저는 출입이 불가능한 페이지
// adminRoute : 아무 값도 들어오지 않으면 adminRoute값은 null이며, admin이 아니다.
export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {
        
        const dispatch = useDispatch();

        //request를 날려서 state별로 처리해줘야 한다.
        useEffect(() => {

            dispatch(auth()).then(response => {

                if (!response.payload.isAuth) {

                    //option이 true면 login 페이지로 돌려버린다.
                    if (option) {
                        props.history.push("/login");
                    }

                } else {
                    //로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/'); //관리자가 아니라면 landing page로.
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }

            })

        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}