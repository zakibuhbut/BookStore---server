import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import jwt from 'jsonwebtoken';
import enviroment from '../config/enviroment.js';
import bcrypt from 'bcrypt';

const UserModel = new mongoose.Schema({
    firstName:{
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Enter First name']
    }, 
    lastName:{
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Enter Last name'],
    }, 
    email:{
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Enter Email'],
        unique: [true, 'Email is already in use'],
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    }, 
    Password:{
        type: String,
        trim: true,
        required: [true, 'Enter Password'],
        minlength: 8,
        validate(value) {
            if (!isStrongPassword(value)) {
                throw new Error(
                    'Password don`t strong enough'
                );
            }
        },

    }, 
    tokens: [
        {
            token:{
                type: String,
                required: true,
            },
        },
    ],

}, {
    toJSON:{
        virtualS:true,
    },
    toObject:{
        virtuals:true,
    },
});

UserModel.pre('save',async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next(); 
});

UserModel.methods.createToken = async function () {
    const user = this;

    const token = jwt.sign({_id: user._id}, enviroment.TOKEN_SECRET);

    user.tokens.push({token: token});

    await user.save();

    return token;

};

UserModel.static.findUser = async (email, password) =>{

    const user = await user.findOne({ email: email})
    if (!user) throw new Error("Unable to login");

    const chackPassword = await bcrypt.compare(password, user.password);

    if (!chackPassword) throw new Error("Unable to login");

    return user;

};

UserModel.method.toJSON - function () {
    const user = this;

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    delete userObj.__V;

    return userObj;
};

UserModel.virtual('cart',{
    ref: 'Cart',
    localField: '_id',
    foreignField: 'ownerID',

});

const User = mongoose.model('BookstoreUsers', UserModel);

export default User;