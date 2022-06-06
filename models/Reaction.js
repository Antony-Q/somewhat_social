const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,

        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reactions'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

reactionSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const reaction = model('reaction', reactionSchema);

module.exports = reaction;