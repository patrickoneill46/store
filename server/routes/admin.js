module.exports = function(mongoose) {

    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId,
        productSchema = new Schema({
            //"_id": ObjectId,
            "name": "String",
            "description": "String",
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
                res.send('saved');
            }

        });

    }

    function removeProduct(req,res){

    }

    function updateProduct(req,res){

    }

    function getProduct(req, res){

    }

    return {
        addProduct: addProduct,
        removeProduct: removeProduct,
        updateProduct: updateProduct,
        getProduct: getProduct
    }

}