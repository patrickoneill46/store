var extend = require('xtend');

module.exports = function(Product){

    function get(req,res){

        var numResults = req.query.numResults || 10,
            page = req.query.pageNum || 1,
            approvedKeys = ['bookingRef', 'status', 'webRioRef'],
            queryObject = extend({}, req.query, req.params);

        Object.keys(queryObject).filter(function(key){
            if(!queryObject[key]){
                //if no param is passed, req.params[key] will resolve to undefined
                //this needs to be delete or the database call will return nothing
                delete queryObject[key];
            }
            return approvedKeys.indexOf(key) == -1;
        }).forEach(function(badKey){
            delete queryObject[badKey];
        });

        Product.paginate(queryObject, page, numResults, function(err, pageCount, paginatedProducts, totalCount){

            if (err){
                console.log('Error: ', err);
                res.send(err);
            } else {
                res.send({
                    status: 200,
                    pageCount: pageCount,
                    bookings: paginatedProducts,
                    totalCount: totalCount
                });
            }
        });
    }

    function getOne(req, res){

        Product.find({_id: req.params.productId}, function(err, product){

            if(err){
                res.status(500).json(err);
            } else {
                res.status(200).json(product);
            }

        });

    }

    return {
        get: get,
        getOne: getOne
    }

}