'use strict';

/**
 * @ngdoc directive
 * @name storeApp.directive:imageDrop
 * @description
 * # imageDrop
 */
angular.module('storeApp')
  .directive('imageDrop', function () {
    return {
      templateUrl: 'views/partials/imagedrop.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
