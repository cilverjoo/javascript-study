const express = require('express')
const app = express() //express로 앱 생성
const port = 5000  //back-server로 5000포트를 둘 것.

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ekim:abc1234@cluster0.o6k4d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요!') //index.js에 보낼 내용
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) //앱에서 해당 포트로 실행
})

