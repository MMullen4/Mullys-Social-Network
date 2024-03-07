const mongoose = require('mongoose');
const { Schema, model } = require('mongoose'); // destructuring library to use Schema and model
const userSchema = new Schema({
    username: {
        type: String, unique: true, required: true, trim: true
    },
    email: {
        type: String, unique: true, required: true, validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: "Please enter a valid email address"
        }
    },

    // create array of _id values referencing the Thought model
    // mongoose will automatically populate this field with the corresponding thoughts when queried
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',  // works like a foreign key in SQL; references the Thought model's _id field
    }],

    // create array of _id values referencing the User model (self-reference)
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // works within the same User collection
    }]
},

{ 
    toJSON: {
        virtuals: true,
    },
    id: false
});

// virtual property 'friendCount' that retrieves the length of the user's friends array field on query.
// not stored in the database
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);  // creates a collection called 'users'
module.exports = User;