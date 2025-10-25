// Steps:
// 1. Define Schema -> Note: id, userId, title, content, createdAt, updatedAt
// 2. Create Model -> <model name>, <schema> Note

const mongoose = require('mongoose');
const { type } = require('os');
const noteSchema = new mongoose.Schema({
    id: {
        type: String,
        uique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);