'use strict';

/**
 * @ngdoc service
 * @name storeApp.adminService
 * @description
 * # adminService
 * Factory in the storeApp.
 */
angular.module('storeApp')
  .factory('adminService', ['$resource', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return {

        product: $resource('/admin/product/:productId', {
            productId: '@_id'
        }, {
            add: {
                method: 'POST'
            },
            update: {
                method: 'PUT'
            },
            remove: {
                method: 'DELETE'
            },
            get: {
                method: 'GET'
            }
        })

    };
  }]);
