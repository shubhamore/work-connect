const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    }
});

const Admin =mongoose.model('Admin',UserSchema);

module.exports = Admin;