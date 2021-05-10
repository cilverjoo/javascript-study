const express = require('express')
const bodyParser = require('body-parser')
const app = express() //express로 앱 생성
const port = 5000  //back-server로 5000포트를 둘 것.
const { User } = require("./models/User")

const config = require("./config/key")

//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있게 해 준다.
app.use(bodyParser.urlencoded({extended: true}))

//application/json 분석해서 가져올 수 있게 해 주기 위해서 필요.
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('염치 어디 바다 넙치에게 줬는지') //index.js에 보낼 내용
})

app.post('/register', (req, res) => {
  //회원가입할 때 필요한 정보들을 클라이언트에서 가져오면 데이터베이스에 넣어준다.

  //body-parser를 이용해서 request를 통해 클라이언트에서 보내는 정보를 받아준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err)
      return res.json({ success: false, err})
    return res.status(200).json({ //status == 200이라면 성공
      success: true //만약 request가 성공한다면 success:true를 띄운다.
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) //앱에서 해당 포트로 실행
})

