'use strict';

/**
 * @ngdoc service
 * @name storeApp.cartService
 * @description
 * # cartService
 * Factory in the storeApp.
 */
angular.module('storeApp')
  .factory('cartService', function ($rootScope, $timeout) {
    // Service logic
    // ...

    var cartContents = {
        numItems : 0,
        totalPrice : 0,
        items: {}
    };


        $rootScope.$watchCollection('cartContents.items', function(newVal, oldVal){

            console.log(newVal, oldVal);

        });

    $rootScope.cartContents = cartContents;

    function addItem(item, quantity){

        quantity = quantity || 1;

        if (!cartContents.items[item._id]){

           cartContents.items[item._id] = {
               item: item,
               quantity: quantity
           }

        } else {

            incrementItem(item._id, quantity);

        }

    }

    function incrementItem(itemKey, incrementAmount){

        incrementAmount = incrementAmount || 1;
        cartContents.items[itemKey].quantity += incrementAmount;
        calcPrice();

    }

    function decrementItem(itemKey, decrementAmount){

        decrementAmount = decrementAmount || 1;

        if (cartContents.items[itemKey]){
            if (cartContents.items[itemKey].quantity <= decrementAmount){
                removeItem(itemKey);
            }
            else {
                cartContents.items[itemKey].quantity -= decrementAmount;
            }

            calcPrice();
        }
    }

    function removeItem (itemKey){

        delete cartContents.items[itemKey];
    }

    function calcPrice(){

        function multiplyTwoNums(a,b){
            return Math.round(a*b*100)/100;
        }

        var totalPrice = 0;

        for (var cartIndex in cartContents.items){

            var cartItem = cartContents.items[cartIndex];

            totalPrice += multiplyTwoNums(cartItem.quantity, cartItem.item.price);
        }

        cartContents.totalPrice = totalPrice;

    }



    // Public API here
    return {
       addItem: addItem,
        incrementItem: incrementItem,
        decrementItem: decrementItem,
        removeItem: removeItem
    };
  });
