const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //salt를 10자리로 만든다.
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true, //space를 없애준다.
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){ //index.js의 user.save로 넘어가기 전에 function을 수행한다.
    var user = this; //
    //비밀문구를 암호화시킨다. 암호화를 위한 bcrypt 다운.
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) { //callback function
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next;
                user.password = hash; //해시가 정상적으로 생성되었다면 user.password를 hash값으로 바꿔준다.
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb){

    //plainPassword 12345 와 암호화된 비밀번호가 맞는지 확인. 암호화된 비밀번호를 복호화 할 수는 없으므로 평문으로 된 패스워드를 같은 방식으로 암호화해준다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err)
            return cb(err);
        cb(null, isMatch) //isMatch가 true ==> 다시 index.js로
    })
}

userSchema.methods.generateToken = function(cb){
      
    var user = this
    var token = jwt.sign(user._id.toHexString(), 'secretToken') //sign 함수를 통해서 user._id와 뒤의 문자열 secretToken을 합쳐서 token을 생성. token을 해석할때 문자열을 알면 id를 알 수 있다.
    
    user.token = token
    user.save(function(err, user) {
      if (err)
        return cb(err) //콜백으로 에러를 전달
      cb(null, user)

    })
  }

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    jwt.verify(token, 'secretToken', function(err, decoded){ //decoded : 문자열로 토큰을 복호화해서 얻은 user._id
        //유저 아이디를 이용해서 유저를 찾은 다음 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({ "_id": decoded, "token": token}, function (err, user) {
                if (err)
                    return cb(err);
                cb(null, user);
            })
        })
}

const User = mongoose.model('User', userSchema) //model의 이름은 User!, type을 적어준다.
module.exports = { User } //다른 파일에서도 쓸 수 있도록 export를 해 준다.
