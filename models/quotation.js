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
    }
});

const Quotation =mongoose.model('Quotation',UserSchema);

module.exports = Quotation;