module.exports = function(mongoose) {

    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId,
        productSchema = new Schema({
            //"_id": ObjectId,
            "productName": "String",
            "description": "String",
            "category": "String",
            "price": "number",
            "available": "Boolean"
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

        console.log('removing product', req.params);

        Product.remove({_id: req.params.productId}, function(err){

            if(err){
                res.send(err);
            } else {

                res.send({
                    status: 'deleted',
                    productId: req.body.productId
                });
            }

        });

    }

    function updateProduct(req,res){

        console.log('updating', req.body);

        Product.findByIdAndUpdate(req.params.productId, {$set: req.body}, function(err, product){

            if (err){
                console.log('error', err);
                res.send(err);
            } else {
                res.send({
                    status: 'udpated',
                    product: product
                });
            }
        });
    }

    function getProduct(req, res){

        var queryObj = {};

        if (req.params.productId){
            queryObj._id = req.params.productId;

            Product.findById(req.params.productId, function(err, product){

                console.log('finding by id');
                if(err){
                    res.send(err);
                } else {
                    res.send(product);
                }

            });



        } else {
            Product.find({}, function(err, products){

                if(err){
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(products);
                }
            });
        }


    }

    return {
        addProduct: addProduct,
        removeProduct: removeProduct,
        updateProduct: updateProduct,
        getProduct: getProduct
    }

}