'use strict';

/**
 * @ngdoc directive
 * @name storeApp.directive:product
 * @description
 * # product
 */
angular.module('storeApp')
  .directive('product', function () {
    return {
      templateUrl: 'views/components/product.html',
      restrict: 'E',
      remove: true,
      link: function postLink(scope, element, attrs) {
        // element.text('this is the product directive');
      },
      scope: {
      	product: '='
      }
    };
  });
