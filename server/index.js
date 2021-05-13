const express = require('express')
const bodyParser = require('body-parser')
const app = express() //express로 앱 생성
const port = 5000  //back-server로 5000포트를 둘 것.
const { User } = require('./models/User')
const config = require('./config/key')
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')


//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게 해 준다.
app.use(bodyParser.urlencoded({extended: true}))

//application/json 분석해서 가져올 수 있게 해 주기 위해서 필요.
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('염치 어디 바다 넙치에게 줬는지') //index.js에 보낼 내용
})

app.post('/api/users/register', (req, res) => {
  //회원가입할 때 필요한 정보들을 클라이언트에서 가져오면 데이터베이스에 넣어준다.

  //body-parser를 이용해서 request를 통해 클라이언트에서 보내는 정보를 받아준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err)
      return res.json({ success: false, err })
    return res.status(200).json({ //status == 200이라면 성공
      success: true //만약 request가 성공한다면 success:true를 띄운다.
    })
  })
})

//로그인기능 구현 => 데이터베이스에 요청된 정보가 있는지 확인하고 유저를 위한 토큰을 생성. (이메일 -> 비밀번호 -> 토큰생성)
app.post('/api/users/login', (req, res) => {

  //요청된 이메일이 데이터베이스에 있는지 확인한다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다! :("
        })
    })

    //토큰을 생성 -> jsonwebtoken 라이브러리 활용
    user.generateToken((err, user) => {
      if (err)
        return res.status(400).send(err)

      //토큰을 저장한다.
      res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id 
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {

  //여기까지 미들웨어를 통과해 왔다는 것은 authentication이 true!
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

// 로그아웃하려는 유저를 데이터베이스에서 찾아 토큰을 지워준다.
app.get('/api/users/logout', auth, (req, res) => {

  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    ( err, user ) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) //앱에서 해당 포트로 실행
})
