var multiparty = require('multiparty'),
    fs = require('fs'),
    Grid = require('gridfs-stream');

module.exports = function(mongoose, conn) {

    var gfs = Grid(conn.db, mongoose.mongo),
        Schema = mongoose.Schema,
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

    function uploadImage(req,res){

        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {


            if(files) {

                var file = files.file[0];

                var writeStream = gfs.createWriteStream({
                    filename: 'my_file.txt'
                });

                writeStream.on('close', function(file) {
                    console.log('upload complete', file);
                });

                fs.createReadStream(file.path).pipe(writeStream);

            } else {

                res.send('no images recieved');
                console.log('No images recieved');

            }

        });

    }

    function getImage(req,res){
        var readstream = gfs.createReadStream({
            _id: '53e0cb4cca769eba50c151d0'
        });

        readstream.pipe(res);

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