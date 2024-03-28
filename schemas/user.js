var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken')
var configs = require('../configs/config')

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: [String],
        default: ["USER"]
    },
    status: {
        type: Boolean,
        default: true
    },
    email: String
}, { timestamps: true })

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 10);
})

userSchema.methods.getJWT = function () {
    var token = jwt.sign({ id: this._id }, configs.SECRET_KEY, {
        expiresIn: configs.EXP_JWT
    });
    return token;
}

module.exports = new mongoose.model('user', userSchema);