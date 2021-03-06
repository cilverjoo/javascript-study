const express = require('express');
const router = express.Router();
const { User } = require("../model/user");
const { auth } = require("../middleware/auth");

router.get('/auth', auth, (req, res) => {

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

router.post("/register", (req, res) => {

	const user = new User(req.body);

	user.save((err, doc) => {
		if (err)
			return res.json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

router.post("/login", (req, res) => {

	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) 
			return res.json({
				loginSuccess: false,
				message: "해당하는 유저 정보가 존재하지 않습니다."
			})

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({ loginSuccess: false, message: "비밀번호가 일치하지 않음"});
		});
		
		user.generateToken((err, user) => {
			if (err) return res.status(400).send(err);
			res.cookie("x_auth", user.token).status(200)
				.json({ 
					loginSuccess: true, userId: user._id 
				});
		});
	});
});

router.get('/logout', auth, (req, res) => {

	User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
		if (err)
			return (res.json({success: false, err }));
		return (res.status(200).send({success: true}));
	});
});

module.exports = router;