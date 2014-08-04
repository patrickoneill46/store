'use strict';

/**
 * @ngdoc function
 * @name storeApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the storeApp
 */
angular.module('storeApp')
  .controller('AdminCtrl', ['$scope', '$routeParams', 'adminService', function ($scope, $routeParams, adminService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        $scope.newProduct = {},
        $scope.editProduct = {};

        if($routeParams.productId){
            adminService.product.get({productId: $routeParams.productId}, function(response){

                $scope.editProduct = response;
            })
        }



        $scope.categories = [
            'Starters',
            'Main',
            'Dessert',
            'Drinks'
        ];

        $scope.addItem = function(form){

            $scope.submitted = true;
            console.log('adding item...');

            if(form.$invalid){
                return;
            }

            adminService.product.add($scope.newProduct, function(response, responseHeaders){

                console.log(response);

            });


            //adminService.product.$add()
        };

        $scope.updateItem = function(form){


            $scope.submitted = true;
            console.log('updating item...');

            if(form.$invalid){
                return;
            }

            adminService.product.update($scope.editProduct, function(response, responseHeaders){

                console.log(response);
            });
        };

        $scope.products = adminService.product.query();


  }]);
