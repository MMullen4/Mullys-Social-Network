const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    }
});

const User = mongoose.model('User', userSchema);  // creates a collection called 'users'
const handleError = (err) => console.log(err);

User.find

module.exports = User;