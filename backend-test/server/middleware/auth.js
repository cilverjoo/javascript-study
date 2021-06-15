const { User } = require('../model/user');

let auth = (req, res, next) => { //이 다음 미들웨어 함수는 일반적으로 next라는 이름을 갖는다.
	//현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 next()를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 한다.
	//그렇지 않으면 해당 요청은 정지된 채로 방치된다.

	//인증처리
	//1. 클라이언트 쿠키에서 토큰을 가져온다 (login 할 때 넣어준 cookie)
	let token = req.cookies.x_auth;

	//토큰을 복호화 한 후 유저를 찾는다
	User.findByToken(token, (err, user) => {
		if (err) return res.json({ findToken: false, error: true });
		if (!user) return res.json({ isAuth: false, error: true })

		req.token = token;
		req.user = user;
		next();  // pass control to the next handler
	});

	//유저가 있으면 인증 ok
	
}

module.exports = { auth };