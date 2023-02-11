const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true,
        
    },
    location:{
        type: 'string',
        required: true
    },
    experience:{
        type: Number,
        required: true
    },
    field_work:{
        type: Array,
        required: true
    },
    contact_no:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    id_proof:{
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