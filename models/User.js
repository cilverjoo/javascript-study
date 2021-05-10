const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

const User = mongoose.model('User', userSchema) //model의 이름은 User!, type을 적어준다.
module.exports = { User } //다른 파일에서도 쓸 수 있도록 export를 해 준다.
