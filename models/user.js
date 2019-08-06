const {mongoose} = require('../db/mongoose');

/* Create User Model Using Mongoose Model
   User Contains 6 Fields And Some Properties
   To Validate Entered Field. */
const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    },
    github: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 11
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    family: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    }
});

module.exports = {User};