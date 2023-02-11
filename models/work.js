const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    work_id: {
        type: 'string',
        required: true
    },
    work:{
        type: Array,
        required: true
    }
});

const Work =mongoose.model('Work',UserSchema);

module.exports = Work;