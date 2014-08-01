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
      templateUrl: 'views/partials/menuitem.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      },
      scope: {
          item: '=item'
      }
    };
  });
