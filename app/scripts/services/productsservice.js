'use strict';

/**
 * @ngdoc service
 * @name storeApp.products
 * @description
 * # products
 * Factory in the storeApp.
 */
angular.module('storeApp')
  .factory('productsService', ['$resource', function ($resource) {


    // Public API here
    return $resource('/products', {

    },{
        get: {
            method: 'GET'
        },
        getOne: {
            method: 'GET',
            params: {
                productId: '@_id'
            },
            url: '/products/:productId'
        }
    });
  }]);
