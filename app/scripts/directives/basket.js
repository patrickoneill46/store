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
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the basket directive');
      }
    };
  });
