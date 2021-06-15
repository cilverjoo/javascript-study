 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const saltRounds = 10;

 const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trim: true, //공백 제거
		unique: 1
	},
	password: {
		type: String, 
		minlength: 5
	},
	role: {
		type: Number,
		default: 0
	},
	image: String,
	toekn: {
		type: String
	},
	tokenExp: {
		type: Number
	},
	coins: [],
	market: []
 })

userSchema.pre('save', function(next) {
	var user = this;
	if (user.isModified('password')) { //User에서 'password' 필드에 수정이 있을 때만 비밀번호를 암호화한다.
		//비밀번호 암호화
		bcrypt.genSalt(saltRounds, function(err, salt){
			if (err) return (next(err))
			bcrypt.hash(user.password, salt, function(err, hash){
				if (err) return (next(err))
				user.password = hash;
				next();
			})
		})
	} else {
		next(); //비동기!! 명백하게 묶어줄 것.
	}
});

userSchema.methods.comparePassword = function(plainPassword, cb) {

	bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, true);
	})
}

userSchema.methods.generateToken = function(cb) {

	var user = this;
	//jsonwebtoken을 이용해서 token 생성하기
	var token = jwt.sign(user._id.toHexString(), 'secretToken');
	user.token = token;
	user.save(function(err, user){
		if (err)
			return cb(err)
		cb(null, user);
	})
}

userSchema.statics.findByToken = function(token, cb) {

	var user = this;

	//토큰을 decode
	jwt.verify(token, 'secretToken', function(err, decoded) {
		//유저 id를 이용해서 유저를 찾은 후 token과 db의 token이 일치하는지 확인.

		user.findOne({"_id": decoded, "token": token}, function(err, user) {
			if (err)
				return cb(err);
			cb(null, user);
		})
	})
}

const User = mongoose.model('User', userSchema) //Schema를 model로 감싸준다
 
module.exports = { User }
