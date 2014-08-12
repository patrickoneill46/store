var http = require('http'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs');

var dbURI = 'localhost', dbPort = 27017, dbName = 'store';
var conn = mongoose.createConnection('mongodb://' + dbURI + '/' + dbName);

conn.on('error', console.error.bind(console, 'connection error'));
conn.once('open', function (){
    console.log('connected to database');
});

var checkout = require('./routes/checkout')(mongoose, conn),
    admin = require('./routes/admin')(mongoose, conn);


var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/bower_components', express.static(__dirname + '/../bower_components/'));
app.use(express.static(__dirname + '/../app/'));

app.route('/checkout').post(checkout.processPayment);

app.route('/admin/product/:productId?')
    .post(admin.addProduct)
    .delete(admin.removeProduct)
    .put(admin.updateProduct)
    .get(admin.getProduct);

app.route('/image/:productId?')
    .post(admin.uploadImage)
    .get(admin.getImage)

app.listen(9000);
