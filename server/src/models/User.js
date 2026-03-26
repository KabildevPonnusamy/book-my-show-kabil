const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        uniqure: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enumValues: ['Admin', 'Partner', 'User'],
        default: 'User'
    },
    resetPasswordToken: {
        type: String,
        index: true // O(1) -> TC, Quick Search
    },
    resetPasswordExpiry: Number
}, {versionKey : false, timestamps: true});

userSchema.methods.isPartner = function() {
    return this.role === 'Partner';
}

userSchema.methods.isAdmin = function() {
    return this.role === 'Admin';
}

const User = mongoose.model('User', userSchema);
module.exports = User;