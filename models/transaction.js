const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerTransactionSchema = new Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'user id is required'],
        trim: true
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'product id is required'],
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

CustomerTransactionSchema.pre('save', function(next){
    var currentDate = new Date();

    // Change the modified_at field to current date.
    this.modified = currentDate;

    // If created_at field doesn't exist set the current date.
    if (!this.created)
        this.created = currentDate;

    next();
});

const CustomerTransaction = mongoose.model('CustomerTransaction', CustomerTransactionSchema);

module.exports = CustomerTransaction;