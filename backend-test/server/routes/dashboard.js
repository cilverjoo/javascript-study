const express = require('express');
const router = express.Router();
const { User } = require("../model/user");

router.post('/getInterestCoins', (req, res) => {

	//mongoDB에서 id에 해당하는 Interest 객체 가져오기
	User.findOne({ "email": req.body.email })
	.exec((err, interest) => {
		if (err) return res.status(400).send(err);
		console.log(interest);
		res.status(200).json({success: true, coinList: interest.coins })
	})
})

router.post('/addcoin', (req,res) => {

	User.findOneAndUpdate({ email: req.body.userEmail }, { coins: req.body.coinList }, (err, user) => {

		if (err)
			return (res.json({ success: false, err }));
		return (res.status(200).send({ success: true }));
	})
})

router.post('/deletecoin',  (req, res) => {

	User.findOneAndUpdate({ email: req.body.userEmail }, {coins: req.body.coinList }, (err, user) => {

		if (err)
			return (res.json({success: false, err}))
		return (res.status(200).send({success: true}));
	})
})

module.exports = router;