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
            }
            , message: "Please enter a valid email address"
        }
    },
    thoughts: [{ // array of _id values referencing the Thought model
        type: Schema.Types.ObjectId,
        ref: 'Thought'  // works like a foreign key in SQL
    }],

    friends: [{ // array of _id values referencing the User model (self-reference)
        type: Schema.Types.ObjectId
        , ref: 'User'
    }]
},
    { // virtuals: true tells Mongoose to include virtuals when converting the MongoDB document to a JSON representation
        toJSON: {
            virtuals: true,
        },
        id: false
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);  // creates a collection called 'users'

module.exports = User;