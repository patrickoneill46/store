'use strict';

/**
 * @ngdoc directive
 * @name storeApp.directive:productForm
 * @description
 * # productForm
 */
angular.module('storeApp')
  .directive('productForm', function () {
    return {
      templateUrl: '/views/partials/productform.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      },
      scope: {
          submitForm: '=',
          submitted: '=',
          categories: '=',
          formData: '='
      }
    };
  });
