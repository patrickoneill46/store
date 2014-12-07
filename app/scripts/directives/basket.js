'use strict';

/**
 * @ngdoc directive
 * @name storeApp.directive:basket
 * @description
 * # basket
 */
angular.module('storeApp')
  .directive('basket', function () {
    return {
      templateUrl: 'views/components/basket.html',
      controller: 'BasketCtrl',
      restrict: 'E',
      remove: true,
      link: function postLink(scope, element, attrs) {

        scope.$on('$routeChangeStart', function (){
          scope.showBasket = false;
        });
        
      }
    };
  });
