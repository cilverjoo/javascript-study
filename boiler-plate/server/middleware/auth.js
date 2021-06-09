const { User } = require('../models/User')

let auth = (req, res, next) => {

    //인증처리를 하는 곳
    //1. 클라이언트 쿠키에서 토큰을 가져온다. (cookie-parser)
    let token = req.cookies.x_auth; //x_auth이름의 쿠키를 request에서 가져온다.

    //2. 토큰을 jsonWebToken으로 복호화해서 유저 id를 얻는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next(); //next가 없으면 여기에 갇혀버립니다.
    })
    
    //3. 데이터베이스에 등록된 유저면 인증 ok!

}

module.exports = { auth };
