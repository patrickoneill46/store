'use strict';

/**
 * @ngdoc directive
 * @name storeApp.directive:menuItem
 * @description
 * # menuItem
 */
angular.module('storeApp')
  .directive('menuItem', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the menuItem directive');
      }
    };
  });
