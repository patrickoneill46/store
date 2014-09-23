'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('ProductsCtrl', ['$scope', 'productsService', function ($scope, productsService) {


    function getProducts(){


        productsService.get(function(response){

            $scope.products = response.products;
            $scope.pageCount = response.pageCount;
            $scope.totalCount = response.totalCount;
        })

    }

    getProducts();

  }]);
