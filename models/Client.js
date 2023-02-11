const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    username:{
        type: 'string',
        required: true
    },
    location:{
        type: 'string',
        required: true
    },
    contact_no:{
        type: Number,
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    }
});

const Client =mongoose.model('Client',UserSchema);

module.exports = Client;