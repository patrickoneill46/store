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

    var cartContents = {};
    $rootScope.cartContents = cartContents;

    function addItem(item, quantity){

        quantity = quantity || 1;

        if (!cartContents[item.key]){

           cartContents[item.key] = {
               item: item,
               quantity: quantity
           }

        } else {

            incrementItem(item.key, quantity);

        }

    }

    function incrementItem(itemKey, incrementAmount){

        incrementAmount = incrementAmount || 1;
        cartContents[itemKey].quantity += incrementAmount;

    }

    function decrementItem(itemKey, decrementAmount){

        decrementAmount = decrementAmount || 1;

        if (cartContents[itemKey].quantity <= decrementAmount){

            removeItem(itemKey);
        }
        else {
            cartContents[itemKey].quantity -= decrementAmount;
        }
    }

    function removeItem (itemKey){

        delete cartContents[itemKey];
    }



    // Public API here
    return {
       addItem: addItem,
        incrementItem: incrementItem,
        decrementItem: decrementItem,
        removeItem: removeItem
    };
  });
