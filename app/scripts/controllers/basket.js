'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:BasketCtrl
 * @description
 * # BasketCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('BasketCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
