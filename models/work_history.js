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
    work:{
        type: 'string',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    location:{
        type: 'string',
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
});

const Work_History =mongoose.model('Work_History',UserSchema);

module.exports = Work_History;