const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dob: {
        type: String
    },
    hobbies: [
        {
            type: String
        },
    ],
    projects: [
        {
            type: String
        },
    ],
    email: {
        type: String
    },
    password: {
        type: String
    },
    profilePicture: {
        type: String
    },
    otp: {
        type: String
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
})


const User = mongoose.model('User', userSchema);
module.exports = User;

