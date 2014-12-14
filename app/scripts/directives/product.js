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
      replace: true,
      link: function postLink(scope, element, attrs) {

        scope.addItem = scope.$parent.addItem;
        scope.decrementItem = scope.$parent.decrementItem;
      },
      scope: {
      	product: '='
      }
    };
  });
