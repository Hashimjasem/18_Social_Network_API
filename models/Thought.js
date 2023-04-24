const { model, Schema } = require('mongoose');

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
{
    toJSON: {
        getters: true,
    },
    id: false,
}
);

module.exports = model('Thoughts', thoughtsSchema)