var mongoose = require("mongoose"),
    mongoosePaginate = require('mongoose-paginate'),
    ProductSchema = new mongoose.Schema({
        "productName": "String",
        "description": "String",
        "category": "String",
        "price": "number",
        "available": "Boolean",
        "images": []
    });

ProductSchema.plugin(mongoosePaginate);
var Product = mongoose.model('Product', ProductSchema, 'products');

module.exports = Product;