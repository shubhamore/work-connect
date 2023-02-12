const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    work_id: {
        type: 'string',
        required: true
    },
    client_id:{
        type: 'string',
        required: true
    },
    work:{
        type: 'string',
        required: true
    },
    location:{
        type: 'string',
        required: true
    }
});

const WorkRequests =mongoose.model('WorkRequests',UserSchema);

module.exports = WorkRequests;