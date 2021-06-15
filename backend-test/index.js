const express = require('express');
const { mongoURI } = require('./server/config/key');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(mongoURI, {
	useNewUrlParser: true,
  	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors());
 
app.use('/api/users', require('./server/routes/users'));
app.use('/api/dashboard', require('./server/routes/dashboard'));


app.get('/api/users/', (req, res) => {
	res.send('안녕하세요!');
})


app.listen(port, () => {
	console.log(`Backend-test is listening on port ${port}!`)
});