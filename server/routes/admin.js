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

module.exports = function(Product) {
//
//    var Schema = mongoose.Schema,
//        ObjectId = Schema.ObjectId,
//        productSchema = new Schema({
//            //"_id": ObjectId,
//            "productName": "String",
//            "description": "String",
//            "category": "String",
//            "price": "number",
//            "available": "Boolean",
//            "images": []
//        });
//
//    var Product = conn.model('Product', productSchema, 'products');

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
                    bucketName = 'tasfirin',
                    imageData = fs.createReadStream(file.path),
                    filename = uuid.v4() + getExtension(file.originalFilename),
                    params = {
                        Bucket: bucketName,
                        ACL: 'public-read',
                        Key: filename,
                        Body: imageData,
                        ContentType: type
                    };
                s3.putObject(params, function(err,data){

                    if(err){
                        console.log(err);
                    }
                    else {
                        console.log('successfully uploaded image to aws', data);

                        Product.findByIdAndUpdate(req.params.productId, {$push: {images: 'http://' + bucketName + '.s3.amazonaws.com/' + filename}}, function(err, product){

                            if (err){
                                console.log('error', err);
                                res.send(err);
                            } else {
                                console.log('updated', product);
                                res.send({
                                    status: 'udpated',
                                    product: product
                                });
                            }
                        });
                    }

                });

            } else {

                res.send('no images recieved');
                console.log('No images recieved');

            }

        });

    }

    function getImage(req,res){

        var params = {
            Bucket: 'tasfirin',
            Key: req.params.imageId
        }

        s3.getObject(params, function(err, data){

            if (err) throw err;

            else {
                console.log(data);
                res.send(data);
            }

        });

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