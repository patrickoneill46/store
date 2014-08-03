module.exports = function(mongoose) {

    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId,
        productSchema = new Schema({
            //"_id": ObjectId,
            "productName": "String",
            "description": "String",
            "category": "String",
            "price": "number"
        });

    var Product = mongoose.model('Product', productSchema, 'products');

    function addProduct (req, res){

        var product = new Product(req.body);

        product.save(function(err, product){

            if (err){
                console.log(err);
                res.send(err);
            } else {
                console.log('saved', product);
                res.send({
                    status: 'saved',
                    addProduct: product
                });
            }

        });

    }

    function removeProduct(req,res){

    }

    function updateProduct(req,res){

    }

    function getProduct(req, res){

        Product.find({}, function(err, products){

            res.send(products);

        });
    }

    return {
        addProduct: addProduct,
        removeProduct: removeProduct,
        updateProduct: updateProduct,
        getProduct: getProduct
    }

}