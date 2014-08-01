module.exports = function(mongoose) {

    function addProduct (req, res){

        console.log(req.body);

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