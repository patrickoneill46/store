'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('MainCtrl', ['cartService', '$rootScope', '$scope', function (cartService, $rootScope, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $rootScope.cart = cartService;

  }]);
