const { model, Schema } = require('mongoose');
const thoughtsSchema = require('./Thought')

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //add mongoose email validation
    },
    thoughts: [thoughtsSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = model('User', userSchema)