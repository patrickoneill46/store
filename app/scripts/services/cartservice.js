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

    $rootScope.cartContents = cartContents;

    function addItem(item, quantity){

        quantity = quantity || 1;
        incrementItem(item, quantity);
        calcPrice();

    }

    function incrementItem(item, incrementAmount){

        if (!cartContents.items[item.key]){

            cartContents.items[item.key] = {
                item: item,
                quantity: incrementAmount
            }
        }
        cartContents.items[item.key].quantity += incrementAmount;

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

        var totalPrice = 0, numItems = 0;

        for (var cartIndex in cartContents.items){

            var cartItem = cartContents.items[cartIndex];
            totalPrice += multiplyTwoNums(cartItem.quantity, cartItem.item.price);
            numItems++;
        }

        cartContents.totalPrice = totalPrice;
        cartContents.numItems = numItems;

    }
    // Public API here
    return {
       addItem: addItem,
        incrementItem: incrementItem,
        decrementItem: decrementItem,
        removeItem: removeItem
    };
  });
