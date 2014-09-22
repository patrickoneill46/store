var mongoose = require("mongoose"),
    ProductSchema = new mongoose.Schema({
        "productName": "String",
        "description": "String",
        "category": "String",
        "price": "number",
        "available": "Boolean",
        "images": []
    }),
    Product = mongoose.model('Product', ProductSchema, 'products');

module.exports = Product;