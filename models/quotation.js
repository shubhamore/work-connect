const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    client_id: {
        type: 'string',
        required: true
    },
    worker_id:{
        type: 'string',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    days:{
        type: Number,
        required: true
    },
    no_of_workers:{
        type: Number,
        required: true
    }
});

const Work_History =mongoose.model('Work_History',UserSchema);

module.exports = Work_History;