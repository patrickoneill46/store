var http = require('http'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


var dbURI = 'localhost', dbPort = 27017, dbName = 'store';
mongoose.connect('mongodb://' + dbURI + '/' + dbName);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('connected to database');
});

var checkout = require('./routes/checkout')(mongoose),
    admin = require('./routes/admin')(mongoose);

var app = express();

app.use(cookieParser());
app.use(bodyParser());
app.use('/bower_components', express.static(__dirname + '/../bower_components/'));
app.use(express.static(__dirname + '/../app/'));

app.route('/checkout').post(checkout.processPayment);

app.route('/admin/product/:productId?')
    .post(admin.addProduct)
    .delete(admin.removeProduct)
    .put(admin.updateProduct)
    .get(admin.getProduct);

app.listen(9000);
