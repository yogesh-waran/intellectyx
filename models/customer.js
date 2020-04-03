const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'first name is required'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true
    },
    salt: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        required: true
    },
    modified: {
        type: Date,
        required: true
    }
});

CustomerSchema.pre('save', function(next){
    var currentDate = new Date();

    // Change the modified_at field to current date.
    this.modified = currentDate;

    // If created_at field doesn't exist set the current date.
    if (!this.created)
        this.created = currentDate;

    next();
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;