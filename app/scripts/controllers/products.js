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

    //ToDo: Get from backend
    $scope.categories = [
        'Starters',
        'Main',
        'Dessert',
        'Drinks'
    ];

    $scope.search = {

    };

    $scope.clearCategory = function(){
        $scope.search.category && delete $scope.search.category;
    }

    function getProducts(){

        productsService.get(function(response){

            $scope.products = response.products;
            $scope.pageCount = response.pageCount;
            $scope.totalCount = response.totalCount;
        });

    }

    $scope.clearSearch = function(key){
        delete $scope.search[key];
    };

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
