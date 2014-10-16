var expect = require("chai").expect,
    should = require("chai").should(),
    sinon = require('sinon'),
    mongooseUtils = require("./../mongoose-utils");


var ProductModel = require('./../../../server/models/mongoose/product');
var ProductRoute = require('./../../../server/routes/products')(ProductModel);

//describe('First Test', function(){
//
//    beforeEach(mongooseUtils.beforeEach);
//    afterEach(mongooseUtils.afterEach);
//
//    it("can be saved", function(done) {
//        new Booking({
//            bookingRef: '12345678',
//            cardNumber: 'asdasasdasdasdasdsada',
//            counter: 0,
//            date: new Date(),
//            emailed: false,
//            lastResponse: '<?xml version="1.0" encoding="UTF-8"?></xml>',
//            status: 'OK',
//            storedToFile: false,
//            webRioRef: '87654321',
//            webRioRequest: '<?xml?></xml>',
//            xml: '<?xml?></xml>'
//        }).save(done);
//
//        ProductRoute.getOne({}, {})
//    });
//
//    //ToDo add a model with the wrong attributes
//
//    //ToDo add a model with the wrong data types in certain attributes
//
//    //ToDo delete a model
//
//    //ToDo delete a model without the correct permissions (i.e. not as an admin)
//
//    //ToDo delete a model WITH the correct permissions (i.e. as an admin)
//
//});

describe('User Tests', function(){

    beforeEach(mongooseUtils.beforeEach);
    afterEach(mongooseUtils.afterEach);

    it("get a list of products", function(done){

        var mockResponseObj = {
            status: function(httpStatus){

                return this;
            },
            json: function(message){

                finished();
                return this;
            }
        };

        var mockRequestObj = {
            params: {},
            query: {}
        };

        function finished(){

            mockResponseObj.status.calledOnce.should.be.true;
            mockResponseObj.json.calledOnce.should.be.true;

            mockResponseObj.status.calledWith(200).should.be.true;
            mockResponseObj.json.firstCall.args[0].should.be.an('object');
            mockResponseObj.json.firstCall.args[0].pageCount.should.be.a('number');
            mockResponseObj.json.firstCall.args[0].totalCount.should.be.a('number');
            mockResponseObj.json.firstCall.args[0].products.should.be.a('array');
            done();
        }

        sinon.spy(mockResponseObj, 'json');
        sinon.spy(mockResponseObj, 'status');

        ProductRoute.get(mockRequestObj, mockResponseObj);

    });


});
