const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    client_id:{
        type: 'string',
        required: true
    },
    work_id:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true
    }
});

const Request =mongoose.model('Request',UserSchema);

module.exports = Request;