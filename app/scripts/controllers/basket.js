'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:BasketCtrl
 * @description
 * # BasketCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('BasketCtrl', ['$scope', 'cartService', function ($scope, cartService) {

  	$scope.removeItem = cartService.removeItem;

  }]);
