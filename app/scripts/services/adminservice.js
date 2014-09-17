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
    console.log('something');
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
        }),

        image: $resource('/image/:imageId', {
            imageId: 'imageId'
        },{
            add: {
                method: 'POST'
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
