var multiparty = require('multiparty'),
    AWS = require('aws-sdk'),
    uuid = require('node-uuid'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime');

// Create an S3 client
var s3 = new AWS.S3();

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

module.exports = function(mongoose, conn) {

    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId,
        productSchema = new Schema({
            //"_id": ObjectId,
            "productName": "String",
            "description": "String",
            "category": "String",
            "price": "number",
            "available": "Boolean",
            "images": {
                type: [],
                default: []
            }
        });

    var Product = conn.model('Product', productSchema, 'products');

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

            Product.findById(req.params.productId, function(err, product){

                console.log('finding by id');
                if(err){
                    res.send(err);
                } else {
                    res.send(product);
                }

            });

        } else {

            queryObj = req.query;

            Product.find(queryObj, function(err, products){

                if(err){
                    console.log(err);
                    res.send(err);
                } else {
                    res.send(products);
                }
            });
        }
    }

    function uploadImage(req,res){

        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {

            if(files) {

                var file = files.file[0],
                    type = file.headers['content-type'],
                    imageData = fs.createReadStream(file.path),
                    params = {
                        Bucket: 'tasfirin',
                        Key: uuid.v4() + '.' + getExtension(file.originalFilename),
                        Body: imageData,
                        ContentType: type
                    };
                s3.putObject(params, function(err,data){

                    if(err){
                        console.log(err);
                    }
                    else {
                        console.log('successfully uploaded image to aws', data);
                    }

                });

            } else {

                res.send('no images recieved');
                console.log('No images recieved');

            }

        });

    }

    function getImage(req,res){

    }

    return {
        addProduct: addProduct,
        removeProduct: removeProduct,
        updateProduct: updateProduct,
        getProduct: getProduct,
        uploadImage: uploadImage,
        getImage: getImage
    }

}