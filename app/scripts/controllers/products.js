'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('ProductsCtrl', ['$scope', 'productsService', 'cartService', function ($scope, productsService, cartService) {


    function getProducts(){


        productsService.get(function(response){

            $scope.products = response.products;
            $scope.pageCount = response.pageCount;
            $scope.totalCount = response.totalCount;
        })

    }

    $scope.addItem = function(item) {
        cartService.addItem(item, 1);
    };

    $scope.incrementItem = function(item){
        cartService.incrementItem(item.key, 1);
    };

    $scope.decrementItem = function(item){
        cartService.decrementItem(item.key, 1);
    };

    $scope.removeItem = function(item){
        cartService.removeItem(item);
    };

    getProducts();

  }]);
