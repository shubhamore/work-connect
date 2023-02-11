const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    contact:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
});

const Client =mongoose.model('Client',UserSchema);

module.exports = Client;