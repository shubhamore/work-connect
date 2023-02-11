const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    description:{
        type: 'string',
        required: true
    }
});

const postWork =mongoose.model('postWork',UserSchema);

module.exports = postWork;