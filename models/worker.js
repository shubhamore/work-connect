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
    experience:{
        type: Number,
        required: true
    },
    field_work:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
});

const Worker =mongoose.model('Worker',UserSchema);

module.exports = Worker;