const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    work_id:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true
    }
});

const postWork =mongoose.model('postWork',UserSchema);

module.exports = postWork;