const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    addedby: {
        type: String,
        required: true
    },
    addedon: {
        type: Date,
        required: true
    },
    endtime: {
        type: Date,
        required: true
    },
    minimumbid: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    tags: [
        String
    ],
    optionTitle: [
        String
    ],
    optionImg: [
        String
    ],
    bidActive: {
        type: Boolean,
        required: true
    },
    highestbid: {
        type: Number
    },
    usersBid: [
        mongoose.Schema.Types.ObjectId
    ],
    usersBidPrice: [
        Number
    ]
});

const Product = mongoose.model("PRODUCT", productSchema);

module.exports = Product;