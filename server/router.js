var passport = require('passport'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    path = require('path'),
    middleware = require('./config/middleware'),
    guid = require('guid');

module.exports = function(env){
    var checkout = require('./routes/checkout')(), products = require("./routes/products")(env.ProductModel),
        user = require("./routes/user")(env.UserModel),
        admin = require("./routes/admin")(env.ProductModel);

    var authenticateRoutes = passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/signin'
    });

    //ToDo Clean this up using modular pattern
    require('./config/authentication.js')(passport, env.UserModel);

    var app = express();

    //set up middleware(s)
//    app.use(session({
//        secret: '1234567890QWERTY',
//        genid: function(req) {
//            return guid.raw(); // use UUIDs for session IDs
//        }
//    }));
//    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(passport.initialize());
    app.use(passport.session());

//    app.route('/signin').get(function (req, res) {
//        res.sendfile(path.resolve(__dirname + '/../app/signin.html'));
//    });
    app.route('/auth/google').get(passport.authenticate('google'));
    app.route('/auth/google/return').get(authenticateRoutes);

//    app.use(middleware.ensureAuthenticated);

    //configure route(s)
    app.route('/').get(function(req,res){

        res.sendFile(path.resolve(__dirname + '/../app/index.html'));

    });
    app.use(express.static(__dirname + '/../app/'));
    app.use('/bower_components', express.static(__dirname + '/../bower_components/'));
    app.use('/fonts', express.static(__dirname + '/../app/styles/fonts/'));

    app.route('/products/')
        .get(products.get);

    app.route('/products/:productId?')
        .get(products.getOne);

    app.route('/admin/product/:productId?')
        .post(admin.addProduct)
        .delete(admin.removeProduct)
        .put(admin.updateProduct)
        .get(admin.getProduct);

    app.route('/image/:productId?')
        .post(admin.uploadImage);

    app.route('/checkout/')
        .post(checkout.processPayment);

    return app;

}

