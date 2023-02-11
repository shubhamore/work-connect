const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    query:{
        type: 'string',
        required: true
    }
});

const Contact =mongoose.model('Contact',UserSchema);

module.exports = Contact;