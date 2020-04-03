const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
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

ProductSchema.pre('save', function(next){
    var currentDate = new Date();

    // Change the modified_at field to current date.
    this.modified = currentDate;

    // If created_at field doesn't exist set the current date.
    if (!this.created)
        this.created = currentDate;

    next();
});

const Products = mongoose.model('Products', ProductSchema);

module.exports = Products;